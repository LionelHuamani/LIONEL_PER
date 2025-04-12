package pe.edu.vallegrande.project.service.impl;

import pe.edu.vallegrande.project.model.ProductModel;
import pe.edu.vallegrande.project.repository.ProductRepository;
import pe.edu.vallegrande.project.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<ProductModel> findAll() {
        log.info("Listando Datos: ");
        return productRepository.findAll();
    }

    @Override
    public Optional<ProductModel> findById(Long id) {
        log.info("Listando Datos por ID: ");
        return productRepository.findById(id);
    }

    @Override
    public ProductModel save(ProductModel productModel) {
        log.info("Registrondo Datos: " + productModel.toString());
        productModel.setState("A");
        return productRepository.save(productModel);
    }

    @Override
    public ProductModel update(ProductModel productModel) {
        log.info("Editando Datos: " + productModel.toString());
        productModel.setState("A");
        return productRepository.save(productModel);
    }

    @Override
    public List<ProductModel> findAllByState(String state) {
        log.info("Listando Datos por Estado: ");
        return productRepository.findAllByState(state);
    }

    @Override
    public ProductModel delete(Long id) {
        log.info("Eliminando lógicamente Datos ID: " + id);
        Optional<ProductModel> productOpt = productRepository.findById(id);
        ProductModel product = productOpt.get();
        product.setState("I");
        return productRepository.save(product);
    }

    @Override
    public ProductModel restore(Long id) {
        log.info("Restaurando lógicamente Datos ID: " + id);
        Optional<ProductModel> productOpt = productRepository.findById(id);
        ProductModel product = productOpt.get();
        product.setState("A");
        return productRepository.save(product);
    }
}