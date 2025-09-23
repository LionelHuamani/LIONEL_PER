package pe.edu.vallegrande.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.vallegrande.project.model.PurchaseDetail;
import java.util.List;

@Repository
public interface PurchaseDetailRepository extends JpaRepository<PurchaseDetail, Long> {

    List<PurchaseDetail> findByPurchaseIdPurchase(Long idPurchase);

}
