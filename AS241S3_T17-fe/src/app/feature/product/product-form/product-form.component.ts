import { Component, inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/interfaces/product';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

// Validadores personalizados
export function nombreValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;
    if (!value) return null;
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)
      ? null
      : { nombreInvalido: 'Solo se permiten letras y espacios.' };
  };
}

// Validador personalizado para decimales positivos
export function decimalValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;
    if (value === null || value === undefined || value === '') return null;
    return /^(\d+(\.\d{1,2})?)$/.test(value)
      ? null
      : { decimalInvalido: 'Ingrese un número válido con hasta dos decimales.' };
  };
}

function descripcionValitor(): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;
    if (!value) return null;
    // Permite letras, números, espacios y signos de puntuación básicos
    return /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,;:()'"-]+$/.test(value)
      ? null
      : { descripcionInvalida: 'La descripción contiene caracteres no permitidos.' };
  };
}


function stockValitor(): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;
    if (value === null || value === undefined || value === '') return null;
    // Solo números enteros positivos (incluyendo 0)
    return /^[0-9]+$/.test(value)
      ? null
      : { stockInvalido: 'El stock debe ser un número entero positivo.' };
  };
}

@Component({
  selector: 'app-product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductFormComponent implements OnInit {
  private productService = inject(ProductService);

  @Input() product?: Product;
  @Output() saved = new EventEmitter<void>();

  form!: FormGroup;


  productos = {
    nombre: '',
    descripcion: '',
    precioUnitario: '',
    stock: ''
  };

  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required, nombreValidator()]],
      description: ['', [Validators.required, descripcionValitor()]],
      unit_price: ['', [Validators.required, decimalValidator() ]],
      stock: ['', [Validators.required, stockValitor()]],
      state: ['']
    });
  }

  ngOnInit(): void {
    this.productService.selectedProduct$.subscribe(product => {
      if (product) {
        this.form.patchValue(product); // Carga los datos en el formulario
      }
    });
  }

  goProductList(): void {
    this.router.navigate(['/product-list']);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const productData = this.form.value as Product;
    const isUpdate = !!productData.id;

    Swal.fire({
      title: isUpdate ? '¿Deseas actualizar?' : '¿Deseas registrar?',
      icon: 'info',
      showDenyButton: true,
      confirmButtonText: isUpdate ? 'Actualizar' : 'Registrar',
      denyButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        const request = isUpdate
          ? this.productService.update(productData)
          : this.productService.save(productData);

        request.subscribe({
          next: res => {
            Swal.fire({
              icon: 'success',
              title: isUpdate ? '¡Actualizado!' : '¡Registrado!',
              text: isUpdate
                ? 'Actualizado con Éxito.'
                : 'Registrado con Éxito.',
              confirmButtonColor: '#3085d6'
            }).then(() => {
              this.saved.emit();
              this.form.reset();
              this.goProductList();
            });
          },
          error: err => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: isUpdate
                ? 'Error al actualizar'
                : 'Error al registrar',
              confirmButtonColor: '#d33'
            });
            console.error('Error al guardar:', err);
          }
        });
      }
    });
  }

  validateForm(): boolean {
     if (this.form.invalid) {
    const errores: string[] = [];

    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control && control.invalid) {
        if (control.errors?.['required']) {
          errores.push(`El campo "${key}" es obligatorio.`);
        }
        if (control.errors?.['decimalInvalido']) {
          errores.push('El precio unitario debe ser un número decimal válido (ej: 2000.50).');
        }
        if (control.errors?.['stockInvalido']) {
          errores.push('El stock debe ser un número entero positivo.');
        }
        if (control.errors?.['nombreInvalido']) {
          errores.push('El nombre solo puede contener letras y espacios.');
        }
        if (control.errors?.['descripcionInvalida']) {
          errores.push('La descripción contiene caracteres no permitidos.');
        }
      }
    });

    this.errorMessage = errores.length > 0
      ? errores.join(' ')
      : 'Por favor, completa todos los campos correctamente.';
    return false;
  }
  this.errorMessage = '';
  return true;
     
  }

  cancelar() {
    console.log('Formulario cancelado');
    this.successMessage = '';
    this.errorMessage = '';
    this.resetForm();
  }

  private resetForm() {
    this.productos = {
      nombre: '',
      descripcion: '',
      precioUnitario: '',
      stock: ''
   };
  }
}




