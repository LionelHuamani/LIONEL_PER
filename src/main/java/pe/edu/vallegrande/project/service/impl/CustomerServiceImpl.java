package pe.edu.vallegrande.project.service.impl;

import pe.edu.vallegrande.project.model.Customer;
import pe.edu.vallegrande.project.repository.CustomerRepository;
import javax.sql.DataSource;

import pe.edu.vallegrande.project.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;

import java.io.InputStream;
import java.time.LocalDate;
import java.time.Period;
import java.util.HashMap;
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
        // Validar que sea mayor de edad
        if (customer.getBirth_date() != null) {
            LocalDate birthDate = customer.getBirth_date();
            LocalDate currentDate = LocalDate.now();
            Period age = Period.between(birthDate, currentDate);
            
            if (age.getYears() < 18) {
                throw new IllegalArgumentException("El cliente debe ser mayor de edad (18 años o más). Edad actual: " + age.getYears() + " años");
            }
        }
        
        customer.setState("A");
        log.info("Registrando Datos: " + customer.toString());
        return customerRepository.save(customer);
    }

    @Override
    public Customer update(Customer customer) {
        // Validar que sea mayor de edad
        if (customer.getBirth_date() != null) {
            LocalDate birthDate = customer.getBirth_date();
            LocalDate currentDate = LocalDate.now();
            Period age = Period.between(birthDate, currentDate);
            
            if (age.getYears() < 18) {
                throw new IllegalArgumentException("El cliente debe ser mayor de edad (18 años o más). Edad actual: " + age.getYears() + " años");
            }
        }
        
        // NO fuerces el estado a "A"
        log.info("Editando Datos: " + customer.toString());
        return customerRepository.save(customer);
    }
    
    @Override
    public void delete(Long id) {
        customerRepository.deleteById(id);
    }

    @Autowired
    private DataSource dataSource;

   @Override
    public byte[] generateJasperPdfReport() throws Exception {
        // Cargar archivo .jasper en src/main/resources/reports (SIN USAR IMÁGENES EN EL JASPER)
        InputStream jasperStream = new ClassPathResource("reports/Customer.jasper").getInputStream();
        // Sin parámetros
        HashMap<String, Object> params = new HashMap<>();
        // Llenar reporte con conexión a Oracle Cloud con application.yml | aplicación.properties
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperStream, params, dataSource.getConnection());
        // Exportar a PDF
        return JasperExportManager.exportReportToPdf(jasperPrint);
    }
}