package pe.edu.vallegrande.project.service;

import pe.edu.vallegrande.project.model.ProductModel;
import java.util.List;
import java.util.Optional;

public interface ProductService {

    List<ProductModel> findAll();

    Optional<ProductModel> findById(Long id);

    ProductModel save(ProductModel productModel);

    ProductModel update(ProductModel productModel);

    List<ProductModel> findAllByState(String state); 

    ProductModel restore(Long id);

    ProductModel delete(Long id);
}