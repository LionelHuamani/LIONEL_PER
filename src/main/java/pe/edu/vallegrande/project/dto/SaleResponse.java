package pe.edu.vallegrande.project.dto;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;

@Data
public class SaleResponse {

    private Long saleId;
    private CustomerDto customer;
    private LocalDateTime saleDate;
    private Double total;
    private String state;
    private List<ProductDetailDto> products;

    // --- Subclases internas DTO ---
    @Data
    public static class CustomerDto {
        private Long customerId;
        private String name;            // Customer.name
        private String typeDocument;    // Customer.type_document
        private String numberDocument;  // Customer.number_document
    }

    @Data
    public static class ProductDetailDto {
        private Long productId;
        private String name;
        private String description;
        private Double salePrice;
        private Integer quantity;
        private Double subtotal;
    }

}
