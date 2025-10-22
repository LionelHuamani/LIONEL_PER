import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerResolver implements Resolve<Customer | null> {
  constructor(private customerService: CustomerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Customer | null> {
    const id = route.paramMap.get('id');
    
    if (id) {
      // Si hay un ID, obtener el cliente específico
      return this.customerService.getCustomerById(+id);
    }
    
    // Si no hay ID, retornar null (para rutas de creación)
    return of(null);
  }
}
