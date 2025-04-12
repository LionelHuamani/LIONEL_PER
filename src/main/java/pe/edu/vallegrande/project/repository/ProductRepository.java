package pe.edu.vallegrande.project.repository;

import pe.edu.vallegrande.project.model.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<ProductModel, Long> {
    List<ProductModel> findAllByState(String state);
}