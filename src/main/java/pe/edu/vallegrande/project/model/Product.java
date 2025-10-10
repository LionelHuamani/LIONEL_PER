package pe.edu.vallegrande.project.model;

import lombok.Data;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Table;

@Entity
@Data
@Table(name = "product", schema = "DEVELOPER_02")
public class Product {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "registration_date")
    private LocalDate registration_date = LocalDate.now();

    @Column(name = "unit_price")
    private Double unit_price;

    @Column(name = "stock")
    private Integer stock;

    @Column(name = "state")
    private String state;

    @Column(name = "id_category")
    private Long category;

    @Column(name = "id_supplier")
    private Long supplier;
}
