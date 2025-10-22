import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Product | null> {
  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product | null> {
    const id = route.paramMap.get('id');
    
    if (id) {
      // Si hay un ID, obtener el producto específico
      return this.productService.getProductById(+id);
    }
    
    // Si no hay ID, retornar null (para rutas de creación)
    return of(null);
  }
}
