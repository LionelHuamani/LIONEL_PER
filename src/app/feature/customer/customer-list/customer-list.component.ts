import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../core/services/customer.service';
import { ReportService } from '../../../core/services/report.service';
import { PdfService } from '../../../core/services/pdf.service';
import { Customer } from '../../../core/interfaces/customer';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CustomerListComponent implements OnInit {
  isSidebarOpen = false;

  filterState: 'ALL' | 'A' | 'I' = 'ALL';

  // ✅ Ajusta las columnas a los campos reales de tu interfaz Customer
  displayedColumns: string[] = [
    'id',
    'nombre',
    'direccion',
    'tipoDocumento',
    'numeroDocumento',
    'celular',
    'email',
    'acciones'
  ];

  customers: Customer[] = [];

  // ✅ Inyección de dependencias
  private customerService = inject(CustomerService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private reportService = inject(ReportService);
  private pdfService = inject(PdfService);
  sortAsc: any;

  ngOnInit(): void {
    // Obtener datos del resolver
    this.route.data.subscribe(data => {
      this.customers = data['customers'] || [];
      console.log('Datos obtenidos del resolver:', this.customers);
    });
  }

  reloadData(): void {
    this.customerService.findAll().subscribe({
      next: (response) => {
        this.customers = response;
        console.log('Datos recargados:', this.customers);
      },
      error: (err) => {
        console.error('Error al recargar clientes:', err);
      }
    });
  }

  goCustomerForm(): void {
    this.router.navigate(['/customer/new']); // Ruta al formulario
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  editCustomer(customer: Customer): void {
    this.customerService.setSelectedCustomer(customer);
    this.router.navigate(['/customer/edit', customer.id]);
  }

  deleteCustomer(customer: Customer): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'El cliente será marcado como inactivo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCustomer = { ...customer, state: 'I' };
        console.log('Enviando al backend:', updatedCustomer);
        this.customerService.update(updatedCustomer).subscribe({
          next: (res) => {
            console.log('Respuesta del backend:', res);
            this.reloadData();
            Swal.fire('Eliminado', 'El cliente fue marcado como inactivo.', 'success');
          },
          error: (err) => {
            console.error('Error al eliminar cliente:', err);
            Swal.fire('Error', 'No se pudo eliminar el cliente. Intenta más tarde.', 'error');
          }
        });
      }
    });
  }

  restoreCustomer(customer: Customer): void {
    const updatedCustomer = { ...customer, state: 'A' };
    this.customerService.update(updatedCustomer).subscribe({
      next: () => {
        this.reloadData();
        Swal.fire('Restaurado', 'El cliente fue restaurado como activo.', 'success');
      },
      error: (err) => {
        console.error('Error al restaurar cliente:', err);
        Swal.fire('Error', 'No se pudo restaurar el cliente. Intenta más tarde.', 'error');
      }
    });
  }

  toggleSortOrder(): void {
    this.sortAsc = !this.sortAsc;
  }

  get filteredCustomers(): Customer[] {
    let filtered = this.filterState === 'ALL'
      ? this.customers
      : this.customers.filter(c => c.state === this.filterState);
    // Ordenar alfabéticamente por nombre (A-Z o Z-A)
    return filtered.slice().sort((a, b) =>
      this.sortAsc
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }

  generatePDF(): void {
    Swal.fire({
      title: 'Generando PDF...',
      text: 'Por favor espere',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.reportService.generateCustomerPDF().subscribe({
      next: (blob) => {
        this.downloadPDF(blob, 'lista-clientes.pdf');
        Swal.fire({
          icon: 'success',
          title: '¡PDF generado!',
          text: 'El archivo se ha descargado correctamente'
        });
      },
      error: (err) => {
        console.error('Error al generar el PDF:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo generar el PDF. Intenta más tarde.'
        });
      }
    });
  }

  private downloadPDF(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  // Método alternativo: Generar PDF en el frontend
  generatePDFFrontend(): void {
    try {
      this.pdfService.generateCustomerPDF(this.customers);
      Swal.fire({
        icon: 'success',
        title: '¡PDF generado!',
        text: 'El archivo se ha descargado correctamente'
      });
    } catch (error) {
      console.error('Error al generar PDF:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo generar el PDF'
      });
    }
  }
}
