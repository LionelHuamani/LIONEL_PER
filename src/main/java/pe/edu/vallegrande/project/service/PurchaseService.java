package pe.edu.vallegrande.project.service;

import java.util.List;

import pe.edu.vallegrande.project.dto.PurchaseRequest;
import pe.edu.vallegrande.project.dto.PurchaseResponse;

public interface PurchaseService {

    PurchaseResponse save(PurchaseRequest purchaseRequest);

    List<PurchaseResponse> findAll();

}