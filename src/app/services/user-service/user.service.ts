import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient) {}

  login(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, body)
  }

  criarUsuario(usuario: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/criar`, usuario, { headers });
  }

  apagarUsuario(usuarioId: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/apagar/${usuarioId}` , { headers });
  }
}
