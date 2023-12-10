import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginData: {login: string, password: string} = {login: '', password: ''};
  loginAuth: boolean = false;
  optionsButton: String [] = [];
  
  constructor(
    private userService: UserService, 
    private router: Router) {
  
  }

  ngOnInit(): void {
    if(localStorage.getItem('userId')){
      this.loginAuth = true;
      if (localStorage.getItem("role") === "MANAGER" || localStorage.getItem("role") === "ADMIN") {
        this.loginAuth = true;
        if (localStorage.getItem("role") === "MANAGER") {
          this.optionsButton.push("Pagina do Residente");
          this.optionsButton.push("Administração");
          this.optionsButton.push("Gerenciar Condomínios");
        } else if (localStorage.getItem("role") === "ADMIN") {
          this.optionsButton.push("Pagina do Residente");
          this.optionsButton.push("Administração");
        } 
      } else if (localStorage.getItem("role") === "USER") {
        this.router.navigate(['/visitantes'])
      }
    }
    
  }

  visitorList(button: String) {
    if(button === "Pagina do Residente"){
      return this.router.navigate(['/visitantes']);
    } else if(button === "Administração") {
      return this.router.navigate(['/administração']);;
    } else if (button === "Gerenciar Condomínios") {
      return this.router.navigate(['/condominio'])
    }
    return
  }

  login() {
    this.userService.login(this.loginData).subscribe({
      next: (response) => {
        const token = response.token;
        const userId = response.userId;
        const role = response.role;
        const condominioId = response.condominioId;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('role', role);
        localStorage.setItem('condominioId', condominioId);
        if (localStorage.getItem("role") === "MANAGER" || localStorage.getItem("role") === "ADMIN") {
          this.loginAuth = true;
          if (localStorage.getItem("role") === "MANAGER") {
            this.optionsButton.push("Pagina do Residente");
            this.optionsButton.push("Administração");
            this.optionsButton.push("Gerenciar Condomínios");
          } else if (localStorage.getItem("role") === "ADMIN") {
            this.optionsButton.push("Pagina do Residente");
            this.optionsButton.push("Administração");
          } 
        } else if (localStorage.getItem("role") === "USER") {
            return this.router.navigate(['/visitantes'])
        }
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
