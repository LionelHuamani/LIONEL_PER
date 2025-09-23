package pe.edu.vallegrande.project.model;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "detail_purchase", schema = "DEVELOPER_02")
public class PurchaseDetail {

     @Id
    @Column(name = "id_detail_purchase")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDetailPurchase;

    @ManyToOne
    @JoinColumn(name = "id_purchase", nullable = false)
    private Purchase purchase;

    @ManyToOne
    @JoinColumn(name = "id_product", nullable = false)
    private Product product;

    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @Column(name = "subtotal")
    private BigDecimal subtotal;

}