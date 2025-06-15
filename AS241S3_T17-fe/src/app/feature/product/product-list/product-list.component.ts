import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/interfaces/product';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  imports: [
    CommonModule,
    FormsModule
  ]
})

export class ProductListComponent implements OnInit {
  isSidebarOpen = false;

  filterState: 'ALL' | 'A' | 'I' = 'ALL';

  // ✅ Ajusta las columnas a los campos reales de tu interfaz Producto
  displayedColumns: string[] = [
    'id',
    'nombre',
    'descripcion',
    'precio_unitario',
    'stock',
    'acciones'
  ];

  products: Product[] = [];

  // ✅ Inyección de dependencias
  private productService = inject(ProductService);
  private router = inject(Router);

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.productService.findAll().subscribe({
      next: (response) => {
        console.log('Listando datos:');
        this.products = response;
      },
      error: (err) => {
        console.error('Error al obtener clientes:', err);
      }
    });
  }

  goProductForm(): void {
    this.router.navigate(['/product-form']); // Ruta al formulario
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  editProduct(product: Product): void {
    this.productService.setSelectedProduct(product);
    this.router.navigate(['/product-form']);
  }

  deleteProduct(product: Product): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'El cliente será marcado como inactivo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteProduct = { ...product, state: 'I' };
        console.log('Enviando al backend:', deleteProduct);
        this.productService.delete(deleteProduct).subscribe({
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

  restoreProduct(product: Product): void {
    const updatedProduct = { ...product, state: 'A' };
    this.productService.update(updatedProduct).subscribe({
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

  get filteredProduct(): Product[] {
    if (this.filterState === 'ALL') return this.products;
    return this.products.filter(c => c.state === this.filterState);
  }
}
