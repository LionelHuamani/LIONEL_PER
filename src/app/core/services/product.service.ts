import { inject, Injectable } from '@angular/core';
//new import
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { Observable, of, catchError } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  private http = inject(HttpClient);
  private urlBackEnd = `${environment.urlBackEnd}/v1/api/product`;

  private selectedProductSubject = new BehaviorSubject<Product | null>(null);
  selectedProduct$ = this.selectedProductSubject.asObservable();

  setSelectedProduct(product: Product | null): void {
    this.selectedProductSubject.next(product);
  }

  findAll() {
    return this.http.get<Product[]>(this.urlBackEnd);
  }

  getProducts(): Observable<Product[]> {
    return this.findAll();
  }

  getProductById(id: number): Observable<Product | null> {
    return this.http.get<Product>(`${this.urlBackEnd}/${id}`).pipe(
      catchError(() => of(null))
    );
  }

  save(product: Product) {
    return this.http.post<Product>(`${this.urlBackEnd}/save`, product);
  }

  update(product: Product) {
    return this.http.put<Product>(`${this.urlBackEnd}/update`, product);
  }

  delete(product: Product){
    return this.http.put<Product>(`${this.urlBackEnd}/delete/${product.id}`, product);
  }

  restore(product: Product){
    return this.http.put<Product>(`${this.urlBackEnd}/restore/${product.id}`, product); 
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

