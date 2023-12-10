// condominio.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CondominioService {
  private baseUrl = 'http://localhost:8080/app/condominio'; // Substitua pela URL do seu backend

  constructor(private http: HttpClient) { }

  getCondominios(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });

    return this.http.get(`${this.baseUrl}`, { headers });
  }

  getCondominioById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });

    return this.http.get(`${this.baseUrl}/${id}`, { headers });
  }

  createCondominio(condominio: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.post(`${this.baseUrl}`, condominio, { headers });
  }

  updateCondominio(id: number, condominio: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.put(`${this.baseUrl}/${id}`, condominio , { headers });
  }

  deleteCondominio(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }
}
