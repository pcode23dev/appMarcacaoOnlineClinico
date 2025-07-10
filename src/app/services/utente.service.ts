import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Utente } from '../models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  constructor(private apiService: ApiService) {}

  obterTodosUtentes(): Observable<Utente[]> {
    return this.apiService.get<Utente[]>('utentes');
  }

  obterUtentePorId(id: number): Observable<Utente> {
    return this.apiService.get<Utente>(`utentes/${id}`);
  }

  criarUtente(utente: Omit<Utente, 'id'>): Observable<Utente> {
    return this.apiService.post<Utente>('utentes', utente);
  }

  atualizarUtente(id: number, utente: Partial<Utente>): Observable<Utente> {
    return this.apiService.patch<Utente>(`utentes/${id}`, utente);
  }

  excluirUtente(id: number): Observable<any> {
    return this.apiService.delete(`utentes/${id}`);
  }

  verificarEmailExiste(email: string, excluirId?: number): Observable<boolean> {
    let query = `utentes?email=${email}`;
    if (excluirId) {
      query += `&id_ne=${excluirId}`;
    }
    
    return this.apiService.get<Utente[]>(query)
      .pipe(
        map(utentes => utentes.length > 0)
      );
  }

  verificarNumeroUtenteExiste(numeroUtente: string, excluirId?: number): Observable<boolean> {
    let query = `utentes?numeroUtente=${numeroUtente}`;
    if (excluirId) {
      query += `&id_ne=${excluirId}`;
    }
    
    return this.apiService.get<Utente[]>(query)
      .pipe(
        map(utentes => utentes.length > 0)
      );
  }

  obterUtentesPorRole(role: string): Observable<Utente[]> {
    return this.apiService.get<Utente[]>(`utentes?role=${role}`);
  }

  // Funções para upload de fotografia (simulada)
  uploadFotografia(file: File): Observable<{url: string}> {
    return new Promise<{url: string}>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          url: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }) as any;
  }
}