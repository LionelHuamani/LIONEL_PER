import { Injectable } from '@angular/core';
import { Customer } from '../interfaces/customer';
import { Observable, of, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly STORAGE_KEY = 'ferreteria_customers';
  
  private selectedCustomerSubject = new BehaviorSubject<Customer | null>(null);
  selectedCustomer$ = this.selectedCustomerSubject.asObservable();

  constructor() { }

  setSelectedCustomer(customer: Customer | null): void {
    this.selectedCustomerSubject.next(customer);
  }

  // Obtener todos los clientes desde localStorage
  findAll(): Observable<Customer[]> {
    try {
      const customers = this.getCustomersFromStorage();
      return of(customers);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
      return of([]);
    }
  }

  // Obtener un cliente por ID
  getCustomerById(id: number): Observable<Customer | null> {
    try {
      const customers = this.getCustomersFromStorage();
      const customer = customers.find(c => c.id === id);
      return of(customer || null);
    } catch (error) {
      console.error('Error al obtener cliente por ID:', error);
      return of(null);
    }
  }

  // Guardar un nuevo cliente
  save(customer: Customer): Observable<Customer> {
    try {
      const customers = this.getCustomersFromStorage();
      const newCustomer: Customer = {
        ...customer,
        id: this.generateId(),
        state: 'ACTIVO'
      };
      
      customers.push(newCustomer);
      this.saveCustomersToStorage(customers);
      
      return of(newCustomer);
    } catch (error) {
      console.error('Error al guardar cliente:', error);
      throw error;
    }
  }

  // Actualizar un cliente existente
  update(customer: Customer): Observable<Customer> {
    try {
      const customers = this.getCustomersFromStorage();
      const index = customers.findIndex(c => c.id === customer.id);
      
      if (index !== -1) {
        customers[index] = { ...customer };
        this.saveCustomersToStorage(customers);
        return of(customers[index]);
      } else {
        throw new Error('Cliente no encontrado');
      }
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
      throw error;
    }
  }

  // Eliminar un cliente
  delete(id: number): Observable<boolean> {
    try {
      const customers = this.getCustomersFromStorage();
      const filteredCustomers = customers.filter(c => c.id !== id);
      this.saveCustomersToStorage(filteredCustomers);
      return of(true);
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      return of(false);
    }
  }

  // Obtener un cliente por ID
  findById(id: number): Observable<Customer | null> {
    try {
      const customers = this.getCustomersFromStorage();
      const customer = customers.find(c => c.id === id);
      return of(customer || null);
    } catch (error) {
      console.error('Error al obtener cliente por ID:', error);
      return of(null);
    }
  }

  // Métodos privados para manejar localStorage
  private getCustomersFromStorage(): Customer[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveCustomersToStorage(customers: Customer[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(customers));
  }

  private generateId(): number {
    const customers = this.getCustomersFromStorage();
    return customers.length > 0 ? Math.max(...customers.map(c => c.id || 0)) + 1 : 1;
  }

  // Método para inicializar datos de ejemplo (opcional)
  initializeSampleData(): void {
    const existingCustomers = this.getCustomersFromStorage();
    if (existingCustomers.length === 0) {
      const sampleCustomers: Customer[] = [
        {
          id: 1,
          name: 'Juan',
          lastName: 'Pérez',
          address: 'Av. Principal 123',
          type_document: 'DNI',
          number_document: '12345678',
          phone: '987654321',
          email: 'juan.perez@email.com',
          birth_date: '1990-05-15',
          state: 'ACTIVO'
        },
        {
          id: 2,
          name: 'María',
          lastName: 'González',
          address: 'Calle Secundaria 456',
          type_document: 'DNI',
          number_document: '87654321',
          phone: '912345678',
          email: 'maria.gonzalez@email.com',
          birth_date: '1985-12-03',
          state: 'ACTIVO'
        },
        {
          id: 3,
          name: 'Carlos',
          lastName: 'Rodríguez',
          address: 'Jr. Libertad 789',
          type_document: 'CNE',
          number_document: '12345678901234567890',
          phone: '923456789',
          email: 'carlos.rodriguez@email.com',
          birth_date: '1992-08-20',
          state: 'ACTIVO'
        }
      ];
      this.saveCustomersToStorage(sampleCustomers);
    }
  }
}
