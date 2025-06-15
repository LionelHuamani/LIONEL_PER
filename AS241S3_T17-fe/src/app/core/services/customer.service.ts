import { inject, Injectable } from '@angular/core';
//new import
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Customer } from '../interfaces/customer';
import { Observable, of, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  constructor() { }


  private http = inject(HttpClient);
  private urlBackEnd = `${environment.urlBackEnd}/v1/api/customer`;

  private selectedCustomerSubject = new BehaviorSubject<Customer | null>(null);
  selectedCustomer$ = this.selectedCustomerSubject.asObservable();

  setSelectedCustomer(customer: Customer | null): void {
    this.selectedCustomerSubject.next(customer);
  }

  findAll() {
    return this.http.get<Customer[]>(this.urlBackEnd);
  }

  save(customer: Customer) {
    return this.http.post<Customer>(`${this.urlBackEnd}/save`, customer);
  }

  update(customer: Customer) {
    return this.http.put<Customer>(`${this.urlBackEnd}/${customer.id}`, customer);
  }

  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.status === 0) {
        console.log(`${operation} failed: Server unreachable`);
      } else if (error.status === 500) {
        const errorMessage = error.error?.message || error.message;
        console.log(`${operation} failed: Server error (500)`, errorMessage);
      } else {
        console.log(`${operation} failed: ${error.status} ${error.message}`);
      }
      
      return of(result as T);
    };
  }
}
