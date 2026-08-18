import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gato, GatoRequest, StatusGato } from '../models/gato.model';

@Injectable({
  providedIn: 'root'
})
export class GatoService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  cadastrar(gato: GatoRequest): Observable<Gato> {
    return this.http.post<Gato>(
      `${this.apiUrl}/gatos`,
      gato
    );
  }
  
  listar(): Observable<Gato[]> {
    return this.http.get<Gato[]>(`${this.apiUrl}/gatos`);
  }

  buscarPorId(id: number): Observable<Gato> {
    return this.http.get<Gato>(`${this.apiUrl}/gatos/${id}`);
  }

  buscarPorStatus(status: StatusGato): Observable<Gato[]> {
    return this.http.get<Gato[]>(`${this.apiUrl}/gatos/busca`, {
      params: { status }
    });
  }

  atualizar(id: number, gato: GatoRequest): Observable<Gato> {
    return this.http.put<Gato>(
      `${this.apiUrl}/gatos/${id}`,
      gato
    );
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/gatos/${id}`
    );
  }
}