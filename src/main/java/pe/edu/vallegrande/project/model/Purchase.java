package pe.edu.vallegrande.project.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "Purchase", schema = "DEVELOPER_02")
public class Purchase {

    @Id
    @Column(name = "id_purchase")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPurchase;

   @Column(name = "id_supplier", nullable = false)
    private Integer idSupplier;

    @Column(name = "fecha_compra")
    private LocalDateTime fechaCompra;

    @Column(name = "total")
    private BigDecimal total;

    @OneToMany(mappedBy = "purchase", cascade = CascadeType.ALL)
    private List<PurchaseDetail> details;
}
