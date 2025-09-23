package pe.edu.vallegrande.project.dto;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;

@Data
public class PurchaseResponse {
    private Long purchaseId;
    private Long supplierId;
    private LocalDateTime fechaCompra;
    private Double total;
    private List<ProductDetailDto> products;

    @Data
    public static class CustomerDto {
        private Long customerId;
        private String name; // Customer.name
        private String typeDocument; // Customer.type_document
        private String numberDocument; // Customer.number_document
    }

    @Data
    public static class ProductDetailDto {
        private Long productId;
        private String name;
        private String description;
        private Double purchasePrice;
        private Integer cantidad;
        private Double subtotal;
    }

}
