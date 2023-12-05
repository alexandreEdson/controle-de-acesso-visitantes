import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuario/login`, body)
  }
}
