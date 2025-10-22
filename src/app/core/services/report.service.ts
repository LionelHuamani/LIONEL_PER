import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private http = inject(HttpClient);
  private urlBackEnd = `${environment.urlBackEnd}/v1/api/customer`;

  constructor() { }

  // Generar PDF de lista de clientes
  generateCustomerPDF(): Observable<Blob> {
    return this.http.get(`${this.urlBackEnd}/pdf`, {
      responseType: 'blob'
    });
  }

  // Generar PDF de lista de productos
  generateProductPDF(): Observable<Blob> {
    return this.http.get(`${environment.urlBackEnd}/v1/api/product/pdf`, {
      responseType: 'blob'
    });
  }

  // Generar PDF de stock de productos
  generateStockPDF(): Observable<Blob> {
    return this.http.get(`${environment.urlBackEnd}/v1/api/product/stock/pdf`, {
      responseType: 'blob'
    });
  }
} 