package pe.edu.vallegrande.project.rest;

import pe.edu.vallegrande.project.model.Customer;
import pe.edu.vallegrande.project.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1/api/customer")
public class CustomerRest {

    private final CustomerService customerService;

    @Autowired
    public CustomerRest(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public List<Customer> findAll() {
        return customerService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Customer> findById(@PathVariable Long id) {
        return customerService.findById(id);
    }

    @PostMapping("/save")
    public Customer save(@RequestBody Customer customer) {
        return customerService.save(customer);
    }

    @PutMapping("/{id}")
    public Customer update(@PathVariable Long id, @RequestBody Customer customer) {
        customer.setId(id); // Con Lombok puedes hacer esto directamente
        return customerService.update(customer);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        customerService.delete(id);
}
}
