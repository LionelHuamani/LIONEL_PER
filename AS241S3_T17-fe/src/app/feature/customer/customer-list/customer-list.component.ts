import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../../core/services/customer.service';
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

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.customerService.findAll().subscribe({
      next: (response) => {
        console.log('Listando datos:');
        this.customers = response;
      },
      error: (err) => {
        console.error('Error al obtener clientes:', err);
      }
    });
  }

  goCustomerForm(): void {
    this.router.navigate(['/customer-form']); // Ruta al formulario
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  editCustomer(customer: Customer): void {
    this.customerService.setSelectedCustomer(customer);
    this.router.navigate(['/customer-form']);
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
            this.findAll();
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
        this.findAll();
        Swal.fire('Restaurado', 'El cliente fue restaurado como activo.', 'success');
      },
      error: (err) => {
        console.error('Error al restaurar cliente:', err);
        Swal.fire('Error', 'No se pudo restaurar el cliente. Intenta más tarde.', 'error');
      }
    });
  }

  get filteredCustomers(): Customer[] {
    if (this.filterState === 'ALL') return this.customers;
    return this.customers.filter(c => c.state === this.filterState);
  }
}
