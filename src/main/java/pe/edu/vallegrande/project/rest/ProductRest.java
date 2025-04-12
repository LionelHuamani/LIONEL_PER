package pe.edu.vallegrande.project.rest;

import pe.edu.vallegrande.project.model.ProductModel;
import pe.edu.vallegrande.project.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1/api/product")
public class ProductRest {

    private final ProductService productService;

    @Autowired
    public ProductRest(ProductService productService) {
        this.productService = productService;
    }
    
    @GetMapping
    public List <ProductModel> findAll(){
        return productService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<ProductModel> findById(@PathVariable Long id) {
        return productService.findById(id);
    }

    @PostMapping("/save")
    public ProductModel save(@RequestBody ProductModel productModel) {
        return productService.save(productModel);
    }

    @PutMapping("/update")
    public ProductModel update(@RequestBody ProductModel productModel) {
        return productService.update(productModel);
    }
    
    @GetMapping("/state/{state}")
    public List<ProductModel> findByState(@PathVariable String state) {
        return ProductService.findAllByState(state);
    }

    @PutMapping("/delete/{id}")
    public ProductModel delete(@PathVariable Long id) {
        return productService.delete(id);
    }

    @PutMapping("/restore/{id}")
    public ProductModel restore(@PathVariable Long id) {
        return productService.restore(id);
    }
}
