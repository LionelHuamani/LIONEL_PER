import { Component, inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../../core/services/customer.service';
import { Customer } from '../../../core/interfaces/customer';
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

export function direccionValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;
    if (!value) return null;
    return /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/.test(value)
      ? null
      : { direccionInvalida: 'No se permiten caracteres especiales.' };
  };
}

export function documentoValidator(typeField: string): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;
    const parent = control.parent;
    if (!parent) return null;
    const type = parent.get(typeField)?.value;
    if (type === 'DNI') {
      return /^\d{8}$/.test(value)
        ? null
        : { documentoInvalido: 'El DNI debe tener exactamente 8 dígitos numéricos.' };
    } else if (type === 'CNE') {
      return /^\d{12}$/.test(value)
        ? null
        : { documentoInvalido: 'El CNE debe tener exactamente 12 dígitos numéricos.' };
    }
    return null;
  };
}

export function celularValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;
    if (!value) return null;
    return /^9\d{8}$/.test(value)
      ? null
      : { celularInvalido: 'El celular debe tener 9 dígitos y empezar con 9.' };
  };
}

export function correoValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;
    if (!value) return null;
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
      ? null
      : { correoInvalido: 'Correo electrónico no válido.' };
  };
}

@Component({
  selector: 'app-customer-form',
  standalone: true,
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomerFormComponent implements OnInit {
  private customerService = inject(CustomerService);

  @Input() customer?: Customer;
  @Output() saved = new EventEmitter<void>();

  form!: FormGroup;


  clientes = {
    nombre: '',
    direccion: '',
    tipoDocumento: '',
    numeroDocumento: '',
    celular: '',
    email: ''
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
      address: ['', [Validators.required, direccionValidator()]],
      type_document: ['', Validators.required],
      number_document: [
        '',
        [Validators.required, documentoValidator('type_document')]
      ],
      phone: ['', [Validators.required, celularValidator()]],
      email: ['', [Validators.required, correoValidator()]],
      state: ['']
    });
  }


  ngOnInit(): void {
    this.customerService.selectedCustomer$.subscribe(customer => {
      if (customer) {
        this.form.patchValue(customer); // Carga los datos en el formulario
      }
    });
  }

  goCustomerList(): void {
    this.router.navigate(['/customer-list']);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const customerData = this.form.value as Customer;
    const isUpdate = !!customerData.id;

    Swal.fire({
      title: isUpdate ? '¿Deseas actualizar?' : '¿Deseas registrar?',
      icon: 'info',
      showDenyButton: true,
      confirmButtonText: isUpdate ? 'Actualizar' : 'Registrar',
      denyButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        const request = isUpdate
          ? this.customerService.update(customerData)
          : this.customerService.save(customerData);

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
              this.goCustomerList();
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
    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.clientes.email)) {
      this.errorMessage = 'Por favor ingrese un email válido.';
      return false;
    }

    // Document number validation
    if (!/^\d{1,12}$/.test(this.clientes.numeroDocumento)) {
      this.errorMessage = 'El número de documento debe contener solo números y no exceder 12 dígitos.';
      return false;
    }

    // Phone number validation
    if (!/^\d{1,15}$/.test(this.clientes.celular)) {
      this.errorMessage = 'El número de celular debe contener solo números.';
      return false;
    }

    return true;
  }

  cancelar() {
    console.log('Formulario cancelado');
    this.successMessage = '';
    this.errorMessage = '';
    this.resetForm();
  }

  private resetForm() {
    this.clientes = {
      nombre: '',
      direccion: '',
      tipoDocumento: '',
      numeroDocumento: '',
      celular: '',
      email: ''
    };
  }
}
