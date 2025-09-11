package pe.edu.vallegrande.project.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import pe.edu.vallegrande.project.dto.SaleRequest;
import pe.edu.vallegrande.project.dto.SaleResponse;
import pe.edu.vallegrande.project.model.Sale;
import pe.edu.vallegrande.project.model.SaleDetail;
import pe.edu.vallegrande.project.repository.CustomerRepository;
import pe.edu.vallegrande.project.repository.ProductRepository;
import pe.edu.vallegrande.project.repository.SaleRepository;
import pe.edu.vallegrande.project.repository.SaleDetailRepository;
import pe.edu.vallegrande.project.service.SaleService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class SaleImpl implements SaleService {

    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final SaleRepository saleRepository;
    private final SaleDetailRepository saleDetailRepository;

    public SaleImpl(CustomerRepository customerRepository,
                    ProductRepository productRepository,
                    SaleRepository saleRepository,
                    SaleDetailRepository saleDetailRepository) {
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
        this.saleRepository = saleRepository;
        this.saleDetailRepository = saleDetailRepository;
    }

    @Transactional
    public SaleResponse save(SaleRequest request) {
        var customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        Sale sale = new Sale();
        sale.setCustomer(customer);
        sale.setSaleDate(java.time.LocalDateTime.now());
        sale.setState("A");

        List<SaleDetail> details = new ArrayList<>();
        double total = 0;

        for (SaleRequest.ProductRequest pr : request.getProducts()) {
            var product = productRepository.findById(pr.getProductId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            // Aquí deberías tener stock en tu modelo ProductModel
            // (si no existe, hay que agregarlo como campo en la entidad)
            // Ejemplo:
            // if (product.getStock() < pr.getQuantity()) { ... }

            // Calcular subtotal con unit_price
            double subtotal = product.getUnit_price() * pr.getQuantity();

            SaleDetail detail = new SaleDetail();
            detail.setProduct(product);
            detail.setQuantity(pr.getQuantity());
            detail.setSubtotal(subtotal);
            detail.setSale(sale);
            detail.setState("A");

            details.add(detail);
            total += subtotal;
        }

        sale.setTotal(total);
        sale.setDetails(details);

        Sale saved = saleRepository.save(sale);
        return toDto(saved);
    }

    public static SaleResponse toDto(Sale sale) {
        SaleResponse dto = new SaleResponse();
        dto.setSaleId(sale.getId());
        dto.setSaleDate(sale.getSaleDate());
        dto.setTotal(sale.getTotal());
        dto.setState(sale.getState());

        // Cliente
        SaleResponse.CustomerDto c = new SaleResponse.CustomerDto();
        c.setCustomerId(sale.getCustomer().getId());
        c.setName(sale.getCustomer().getName());
        c.setTypeDocument(sale.getCustomer().getType_document());
        c.setNumberDocument(sale.getCustomer().getNumber_document());
        dto.setCustomer(c);

        // Productos
        dto.setProducts(
            sale.getDetails().stream().map(d -> {
                SaleResponse.ProductDetailDto pd = new SaleResponse.ProductDetailDto();
                pd.setProductId(d.getProduct().getId());
                pd.setName(d.getProduct().getName());
                pd.setDescription(d.getProduct().getDescription());
                pd.setSalePrice(d.getProduct().getUnit_price()); // unit_price en lugar de salePrice
                pd.setQuantity(d.getQuantity());
                pd.setSubtotal(d.getSubtotal());
                return pd;
            }).collect(Collectors.toList())
        );

        return dto;
    }

    public List<SaleResponse> findAll() {
        List<Sale> sales = saleRepository.findAll();

        return sales.stream().map(sale -> {
            SaleResponse response = new SaleResponse();
            response.setSaleId(sale.getId());
            response.setSaleDate(sale.getSaleDate());
            response.setTotal(sale.getTotal());
            response.setState(sale.getState());

            // Cliente
            SaleResponse.CustomerDto customerDto = new SaleResponse.CustomerDto();
            customerDto.setCustomerId(sale.getCustomer().getId());
            customerDto.setName(sale.getCustomer().getName());
            customerDto.setTypeDocument(sale.getCustomer().getType_document());
            customerDto.setNumberDocument(sale.getCustomer().getNumber_document());
            response.setCustomer(customerDto);

            // Detalles de productos
            List<SaleDetail> details = saleDetailRepository.findBySaleId(sale.getId());
            List<SaleResponse.ProductDetailDto> productDtos = details.stream().map(detail -> {
                SaleResponse.ProductDetailDto productDto = new SaleResponse.ProductDetailDto();
                productDto.setProductId(detail.getProduct().getId());
                productDto.setName(detail.getProduct().getName());
                productDto.setDescription(detail.getProduct().getDescription());
                productDto.setSalePrice(detail.getProduct().getUnit_price());
                productDto.setQuantity(detail.getQuantity());
                productDto.setSubtotal(detail.getSubtotal());
                return productDto;
            }).collect(Collectors.toList());
            response.setProducts(productDtos);

            return response;
        }).collect(Collectors.toList());
    }

}
