import { Component } from '@angular/core';
import { UserService } from '../user-service/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginData: {login: string, password: string} = {login: '', password: ''};
  loginAuth: boolean = false;
  optionsButton: String [] = [];
  
  constructor(
    private userService: UserService, 
    private http: HttpClient) {
  
  }

  login() {
    this.userService.login(this.loginData).subscribe(response => {
      const token = response.token
      const userId = response.userId;
      const role = response.role;
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('role', role);
      if (localStorage.getItem("role") === "MANAGER" || localStorage.getItem("role") === "ADMIN") {
        this.loginAuth = true;
        if (localStorage.getItem("role") === "MANAGER") {
          this.optionsButton.push("Pagina do Residente");
          this.optionsButton.push("Administração");
          this.optionsButton.push("Gerenciar Condomínios");
        } else {
          this.optionsButton.push("Pagina do Residente");
          this.optionsButton.push("Administração");
        }
      }
      return new HttpHeaders().set('Authorization', `Berear ${token}`);
    });
  }
}
