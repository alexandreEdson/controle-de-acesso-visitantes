import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResidenteService {

  private apiUrl = 'http://localhost:8080/residente';

  constructor(private http: HttpClient) { }

  getResidentes(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiUrl, { headers });
  }

  getResidenteById(id: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }

  getResidenteByUserId(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const getUserId =localStorage.getItem('userId');
    return this.http.get<any>(`${this.apiUrl}/user/${getUserId}`, { headers });
  }

  getResidenteByCondominioId(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const getUserId =localStorage.getItem('userId');
    return this.http.get<any>(`${this.apiUrl}/condominio/${localStorage.getItem('condominioId')}`, { headers });
  }

  adicionarResidente(residente: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.apiUrl, residente, { headers });
  }

  updateResidente(id: number, residenteAtualizado: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/${id}`, residenteAtualizado, { headers });
  }

  deleteResidenteById(id: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }
}
