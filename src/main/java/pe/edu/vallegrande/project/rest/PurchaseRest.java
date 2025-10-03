package pe.edu.vallegrande.project.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pe.edu.vallegrande.project.dto.PurchaseRequest;
import pe.edu.vallegrande.project.dto.PurchaseResponse;
import pe.edu.vallegrande.project.service.PurchaseService;
import java.util.List;

@RestController
@RequestMapping("/v1/api/purchase") // Cambiado de /sale a /purchase
public class PurchaseRest {

    private final PurchaseService purchaseService;

    public PurchaseRest(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    @GetMapping
    public List<PurchaseResponse> findAll() {
        return purchaseService.findAll();
    }

    @PostMapping("/save")
    public PurchaseResponse save(@RequestBody PurchaseRequest purchaseRequest) {
        return purchaseService.save(purchaseRequest);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PurchaseResponse> findById(@PathVariable Long id) {
        return purchaseService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}