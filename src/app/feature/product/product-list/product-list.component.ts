import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/interfaces/product';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TruncatePipe } from "../../../core/pipes/truncate.pipe";

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    TruncatePipe
]
})

export class ProductListComponent implements OnInit {
  filterState: 'ALL' | 'A' | 'I' = 'ALL';
  products: Product[] = [];
  sortAsc: boolean = true;

  // ✅ Inyección de dependencias
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    // Obtener datos del resolver
    this.route.data.subscribe(data => {
      this.products = data['products'] || [];
      console.log('Datos de productos obtenidos del resolver:', this.products);
    });
  }

  get filteredProducts(): Product[] {
    let filtered = this.filterState === 'ALL'
      ? this.products
      : this.products.filter(p => p.state === this.filterState);
    
    return filtered.slice().sort((a, b) =>
      this.sortAsc
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }

  toggleSortOrder(): void {
    this.sortAsc = !this.sortAsc;
  }

  trackByProductId(index: number, product: Product): number {
    return product.id || index;
  }

  getCategoryName(id: number): string {
    const categories: { [key: number]: string } = {
      1: 'Herramientas',
      2: 'Materiales de Construcción',
      3: 'Ferretería General',
      4: 'Pinturas',
      5: 'Electricidad'
    };
    return categories[id] || 'Desconocida';
  }

  getSupplierName(id: number): string {
    const suppliers: { [key: number]: string } = {
      1: 'Proveedor A',
      2: 'Proveedor B',
      3: 'Proveedor C',
      4: 'Proveedor D'
    };
    return suppliers[id] || 'Desconocido';
  }

  reloadData(): void {
    this.productService.findAll().subscribe({
      next: (response) => {
        this.products = response;
        console.log('Datos de productos recargados:', this.products);
      },
      error: (err) => {
        console.error('Error al recargar productos:', err);
      }
    });
  }

  goProductForm(): void {
    this.router.navigate(['/product/new']); // Ruta al formulario
  }

  editProduct(product: Product): void {
    this.productService.setSelectedProduct(product);
    this.router.navigate(['/product/edit', product.id]);
  }

  deleteProduct(product: Product): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'El producto será marcado como inactivo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedProduct = { ...product, state: 'I' };
        this.productService.update(updatedProduct).subscribe({
          next: (res) => {
            console.log('Respuesta del backend:', res);
            this.reloadData();
            Swal.fire('Eliminado', 'El producto fue marcado como inactivo.', 'success');
          },
          error: (err) => {
            console.error('Error al eliminar producto:', err);
            Swal.fire('Error', 'No se pudo eliminar el producto. Intenta más tarde.', 'error');
          }
        });
      }
    });
  }

  restoreProduct(product: Product): void {
    const updatedProduct = { ...product, state: 'A' };
    this.productService.update(updatedProduct).subscribe({
      next: () => {
        this.reloadData();
        Swal.fire('Restaurado', 'El producto fue restaurado como activo.', 'success');
      },
      error: (err) => {
        console.error('Error al restaurar producto:', err);
        Swal.fire('Error', 'No se pudo restaurar el producto. Intenta más tarde.', 'error');
      }
    });
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

    // Aquí puedes implementar la generación de PDF
    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: '¡PDF generado!',
        text: 'El archivo se ha descargado correctamente'
      });
    }, 2000);
  }

  generatePDFFrontend(): void {
    try {
      // Aquí puedes implementar la generación de PDF en el frontend
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