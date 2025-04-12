package pe.edu.vallegrande.project.model;

import lombok.Data;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;

@Entity
@Data
@Table(name = "client")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cliente_id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "addres")
    private Integer addres;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;
}