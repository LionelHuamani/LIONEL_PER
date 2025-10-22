import { Component, inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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
      return /^\d{20}$/.test(value)
        ? null
        : { documentoInvalido: 'El CNE debe tener exactamente 20 dígitos numéricos.' };
    }
    return null;
  };
}

export function celularValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;
    if (!value) return null;
    // Debe empezar con 9 y tener 9 dígitos
    if (!/^9\d{8}$/.test(value)) {
      return { celularInvalido: 'El celular debe tener 9 dígitos y empezar con 9.' };
    }
    // No permitir que los 8 dígitos después del 9 sean todos iguales
    const afterNine = value.substring(1);
    if (/^(\d)\1{7}$/.test(afterNine)) {
      return { celularRepetido: 'No se permiten todos los dígitos iguales después del 9.' };
    }
    return null;
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

export function noRepetidosValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;
    if (!value) return null;
    // Si todos los caracteres son iguales
    if (/^(\d)\1+$/.test(value)) {
      return { repetidos: 'No se permiten todos los dígitos iguales.' };
    }
    return null;
  };
}

export function fechaNacimientoValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;
    if (!value) return null;
    
    const fechaNacimiento = new Date(value);
    const fechaActual = new Date();
    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    const mes = fechaActual.getMonth() - fechaNacimiento.getMonth();
    
    // Verificar si ya cumplió años este año
    if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    
    if (edad < 18) {
      return { fechaInvalida: 'El cliente debe tener al menos 18 años.' };
    }
    
    if (fechaNacimiento > fechaActual) {
      return { fechaInvalida: 'La fecha de nacimiento no puede ser futura.' };
    }
    
    return null;
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
  private route = inject(ActivatedRoute);

  @Input() customer?: Customer;
  @Output() saved = new EventEmitter<void>();

  form!: FormGroup;



  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required, nombreValidator()]],
      lastName: ['', [Validators.required, nombreValidator()]],
      address: ['', [Validators.required, direccionValidator()]],
      type_document: ['', Validators.required],
      number_document: [
        '',
        [Validators.required, documentoValidator('type_document'), noRepetidosValidator()]
      ],
      phone: ['', [Validators.required, celularValidator(), noRepetidosValidator()]],
      email: ['', [Validators.required, correoValidator()]],
      birth_date: ['', [Validators.required, fechaNacimientoValidator()]],
      state: ['']
    });
  }


  ngOnInit(): void {
    // Obtener datos del resolver
    this.route.data.subscribe(data => {
      const customer = data['customer'];
      if (customer) {
        this.form.patchValue(customer); // Carga los datos en el formulario
        console.log('Datos del cliente obtenidos del resolver:', customer);
      }
    });
  }

  goCustomerList(): void {
    this.router.navigate(['/customer']);
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
                ? 'Cliente actualizado con éxito.'
                : 'Cliente registrado con éxito.',
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
                ? 'Error al actualizar cliente'
                : 'Error al registrar cliente',
              confirmButtonColor: '#d33'
            });
            console.error('Error al guardar:', err);
          }
        });
      }
    });
  }


}
