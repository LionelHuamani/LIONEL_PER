package pe.edu.vallegrande.project.service.impl;

import pe.edu.vallegrande.project.model.Customer;
import pe.edu.vallegrande.project.repository.CustomerRepository;
import pe.edu.vallegrande.project.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public List<Customer> findAll() {
        log.info("Listando Datos: ");
        return customerRepository.findAll();
    }

    @Override
    public Optional<Customer> findById(Long id) {
        log.info("Listando Datos por ID: ");
        return customerRepository.findById(id);
    }

    @Override
    public Customer save(Customer customer) {
        customer.setState("A");
        log.info("Registrondo Datos: " + customer.toString());
        return customerRepository.save(customer);
    }

    @Override
    public Customer update(Customer customer) {
    // NO fuerces el estado a "A"
    log.info("Editando Datos: " + customer.toString());
    return customerRepository.save(customer);
}
    
    @Override
    public void delete(Long id) {
        customerRepository.deleteById(id);
}
}