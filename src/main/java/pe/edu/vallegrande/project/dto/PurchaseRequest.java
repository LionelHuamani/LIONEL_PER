package pe.edu.vallegrande.project.dto;

import java.util.List;
import lombok.Data;

@Data
public class PurchaseRequest {
    
    private Long supplierId;
    private List<ProductRequest> products;

    @Data
    public static class ProductRequest {
        private Long productId;
        private int cantidad;
    }
    
}