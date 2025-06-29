package pe.edu.vallegrande.project.repository;

import pe.edu.vallegrande.project.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByState(String state);
}