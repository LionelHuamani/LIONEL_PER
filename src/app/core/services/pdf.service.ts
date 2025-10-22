import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Customer } from '../interfaces/customer';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  generateCustomerPDF(customers: Customer[]): void {
    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(20);
    doc.text('Lista de Clientes', 105, 20, { align: 'center' });
    
    // Fecha
    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 35);
    
    // Tabla de clientes
    const tableData = customers.map(customer => [
      customer.id,
      customer.name,
      customer.type_document + ' - ' + customer.number_document,
      customer.phone,
      customer.email,
      customer.state === 'A' ? 'Activo' : 'Inactivo'
    ]);

    (doc as any).autoTable({
      startY: 45,
      head: [['ID', 'Nombre', 'Documento', 'Teléfono', 'Email', 'Estado']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [37, 99, 235],
        textColor: 255,
        fontSize: 12,
        fontStyle: 'bold'
      },
      bodyStyles: {
        fontSize: 10
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      }
    });

    // Guardar PDF
    doc.save('lista-clientes.pdf');
  }

  generateProductPDF(products: Product[]): void {
    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(20);
    doc.text('Lista de Productos', 105, 20, { align: 'center' });
    
    // Fecha
    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 35);
    
    // Tabla de productos
    const tableData = products.map(product => [
      product.id,
      product.name,
      product.description || '-',
      product.unit_price,
      product.stock,
      product.state === 'A' ? 'Activo' : 'Inactivo'
    ]);

    (doc as any).autoTable({
      startY: 45,
      head: [['ID', 'Nombre', 'Descripción', 'Precio', 'Stock', 'Estado']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [37, 99, 235],
        textColor: 255,
        fontSize: 12,
        fontStyle: 'bold'
      },
      bodyStyles: {
        fontSize: 10
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      }
    });

    // Guardar PDF
    doc.save('lista-productos.pdf');
  }
} 