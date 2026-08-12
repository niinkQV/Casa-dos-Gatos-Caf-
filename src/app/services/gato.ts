import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gato, GatoRequest } from '../models/gato.model';

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
}