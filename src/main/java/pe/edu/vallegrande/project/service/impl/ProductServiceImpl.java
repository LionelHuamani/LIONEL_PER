package pe.edu.vallegrande.project.service.impl;

import pe.edu.vallegrande.project.model.Product;
import pe.edu.vallegrande.project.repository.ProductRepository;
import pe.edu.vallegrande.project.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import javax.sql.DataSource;

@Slf4j
@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> findAll() {
        log.info("Listando Datos: ");
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> findById(Long id) {
        log.info("Listando Datos por ID: ");
        return productRepository.findById(id);
    }

    @Override
    public Product save(Product productModel) {
        log.info("Registrondo Datos: " + productModel.toString());
        productModel.setState("A");
        return productRepository.save(productModel);
    }

    @Override
    public Product update(Product productModel) {
        log.info("Editando Datos: " + productModel.toString());
        productModel.setState("A");
        return productRepository.save(productModel);
    }

    @Override
    public List<Product> findAllByState(String state) {
        log.info("Listando Datos por Estado: ");
        return productRepository.findAllByState(state);
    }

    @Override
    public Product delete(Long id) {
        log.info("Eliminando lógicamente Datos ID: " + id);
        Optional<Product> productOpt = productRepository.findById(id);
        Product product = productOpt.get();
        product.setState("I");
        return productRepository.save(product);
    }

    @Override
    public Product restore(Long id) {
        log.info("Restaurando lógicamente Datos ID: " + id);
        Optional<Product> productOpt = productRepository.findById(id);
        Product product = productOpt.get();
        product.setState("A");
        return productRepository.save(product);
    }

    @Autowired
    private DataSource dataSource;

   @Override
    public byte[] generateJasperPdfReport() throws Exception {
        // Cargar archivo .jasper en src/main/resources/reports (SIN USAR IMÁGENES EN EL JASPER)
        InputStream jasperStream = new ClassPathResource("reports/Product.jasper").getInputStream();
        // Sin parámetros
        HashMap<String, Object> params = new HashMap<>();
        // Llenar reporte con conexión a Oracle Cloud con application.yml | aplicación.properties
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperStream, params, dataSource.getConnection());
        // Exportar a PDF
        return JasperExportManager.exportReportToPdf(jasperPrint);
    }
}