import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = 'http://localhost:4000/api/productos'; // Update the URL to match your API endpoint

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    return this.http.get(this.url);
  }

  deleteProducto(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  guardarProducto(formData: FormData): Observable<any> {
    return this.http.post(this.url, formData);
  }
  

  viewProducto(id?: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  actualizarProducto(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.url}/${id}`, formData);
  }
}
