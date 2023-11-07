import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tienda } from '../models/tienda';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private apiUrl = 'http://localhost:4000/api'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  getTiendas(): Observable<Tienda[]> {
    return this.http.get<Tienda[]>(`${this.apiUrl}/tiendas`);
  }

  viewTienda(id: string): Observable<Tienda> {
    return this.http.get<Tienda>(`${this.apiUrl}/tiendas/${id}`);
  }

  actualizarTienda(id: string, tienda: Tienda): Observable<Tienda> {
    return this.http.put<Tienda>(`${this.apiUrl}/tiendas/${id}`, tienda);
  }

  deleteTienda(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tiendas/${id}`);
  }

  crearTienda(tienda: Tienda): Observable<Tienda> {
    return this.http.post<Tienda>(`${this.apiUrl}/tiendas`, tienda);
  }
  getTiendasPorDistrito(distrito: string): Observable<Tienda[]> {
    return this.http.get<Tienda[]>(`${this.apiUrl}/tiendas?distrito=${distrito}`);
  }
  
}
