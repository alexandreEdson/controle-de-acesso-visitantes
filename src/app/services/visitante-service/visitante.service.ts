import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VisitanteService {

  private apiUrl = 'http://localhost:8080/app/condominio';

  constructor(private http: HttpClient) { }

  getAllVisitantesByCondominio(): Observable<any>  {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });

    return this.http.get<any>(`${this.apiUrl}/${localStorage.getItem('condominioId')}/visitante`, { headers });
  }

  getVisitantesByResidencia(residenciaId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get<any>(`${this.apiUrl}/residencia/${residenciaId}/visitante`, { headers });
  }

  getVisitantesByUserId(userId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get<any>(`${this.apiUrl}/residencia/user/${userId}`, { headers });
  }

  getVisitanteById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });

    return this.http.get<any>(`${this.apiUrl}/residencia/visitante/${id}`, { headers });
  }

  addVisitante(visitante: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/residencia/visitante`, visitante, { headers });
  }

  updateVisitante(visitante: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
      'Content-Type': 'application/json'
    });

    return this.http.put<any>(`${this.apiUrl}/residencia/visitante/${visitante.id}`, visitante, { headers });
  }

  deleteVisitante(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });

    return this.http.delete<any>(`${this.apiUrl}/residencia/visitante/${id}`, { headers });
  }
}

