package pe.edu.vallegrande.project.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import pe.edu.vallegrande.project.dto.PurchaseRequest;
import pe.edu.vallegrande.project.dto.PurchaseResponse;
import pe.edu.vallegrande.project.model.Purchase;
import pe.edu.vallegrande.project.model.PurchaseDetail;
import pe.edu.vallegrande.project.repository.ProductRepository;
import pe.edu.vallegrande.project.repository.PurchaseRepository;
import pe.edu.vallegrande.project.repository.PurchaseDetailRepository;
import pe.edu.vallegrande.project.service.PurchaseService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PurchaseImpl implements PurchaseService {

    private final ProductRepository productRepository;
    private final PurchaseRepository purchaseRepository;
    private final PurchaseDetailRepository purchaseDetailRepository;

    public PurchaseImpl(ProductRepository productRepository,
                        PurchaseRepository purchaseRepository,
                        PurchaseDetailRepository purchaseDetailRepository) {
        this.productRepository = productRepository;
        this.purchaseRepository = purchaseRepository;
        this.purchaseDetailRepository = purchaseDetailRepository;
    }

    @Transactional
    public PurchaseResponse save(PurchaseRequest request) {
        // Crear la compra
        Purchase purchase = new Purchase();
        // Convertir Long a Integer si es necesario
        purchase.setIdSupplier(request.getSupplierId() != null ? request.getSupplierId().intValue() : null);
        purchase.setFechaCompra(java.time.LocalDateTime.now());

        List<PurchaseDetail> details = new ArrayList<>();
        double total = 0;

        // Procesar productos
        for (PurchaseRequest.ProductRequest pr : request.getProducts()) {
            var product = productRepository.findById(pr.getProductId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            double subtotal = product.getUnit_price() * pr.getCantidad();

            PurchaseDetail detail = new PurchaseDetail();
            detail.setProduct(product);
            detail.setCantidad(pr.getCantidad());
            detail.setSubtotal(java.math.BigDecimal.valueOf(subtotal));
            detail.setPurchase(purchase);

            details.add(detail);
            total += subtotal;
        }

        purchase.setTotal(java.math.BigDecimal.valueOf(total));
        purchase.setDetails(details);

        // Guardar la compra y retornar el DTO
        Purchase saved = purchaseRepository.save(purchase);
        return toDto(saved);
    }

    public static PurchaseResponse toDto(Purchase purchase) {
        PurchaseResponse dto = new PurchaseResponse();
        dto.setPurchaseId(purchase.getIdPurchase());
        dto.setFechaCompra(purchase.getFechaCompra());
        dto.setTotal(purchase.getTotal().doubleValue());
        dto.setSupplierId(purchase.getIdSupplier() != null ? purchase.getIdSupplier().longValue() : null);

        dto.setProducts(
                purchase.getDetails().stream().map(d -> {
                    PurchaseResponse.ProductDetailDto pd = new PurchaseResponse.ProductDetailDto();
                    pd.setProductId(d.getProduct().getId());
                    pd.setName(d.getProduct().getName());
                    pd.setDescription(d.getProduct().getDescription());
                    pd.setPurchasePrice(d.getProduct().getUnit_price());
                    pd.setCantidad(d.getCantidad());
                    pd.setSubtotal(d.getSubtotal().doubleValue());
                    return pd;
                }).collect(Collectors.toList())
        );

        return dto;
    }

    public List<PurchaseResponse> findAll() {
        return purchaseRepository.findAll()
                .stream()
                .map(PurchaseImpl::toDto)
                .collect(Collectors.toList());
    }
}