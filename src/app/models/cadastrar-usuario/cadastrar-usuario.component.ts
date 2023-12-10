import { Component, OnInit } from '@angular/core';
import { ResidenteService } from '../../services/residente-service/residente.service';
import { UserService } from '../../services/user-service/user.service';
import { ResidenciaService } from '../../services/residencia-service/residencia.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrl: './cadastrar-usuario.component.scss'
})
export class CadastrarUsuarioComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CadastrarUsuarioComponent>,
    private userService: UserService,
    private residenteService: ResidenteService,
    private residenciaService: ResidenciaService,
    private router: Router
    ){}

  ngOnInit(): void {
    this.pegarUnidades()
  }

  roles = ['ADMIN', 'USER'];
  unidades = [];
  data: any;

  usuario: any = {
    login: null,
    password: null,
    role: null,
    condominio: {
      id: localStorage.getItem('condominioId')
    },
  };

  residente: any = {
    nome: null,
    sobrenome: null,
    email: null,
    condominio: {
      id: null
    },
    residencias: [{
      id: null
    }],
    user: {
      id: null
    }
  };
  
  cancelar(): void {
    this.dialogRef.close();
  }

  pegarUnidades() {
    this.residenciaService.getResidenciaByCondominioId().subscribe({
      next: response => {
        this.data = response['residencias'];
      }
    })
  }

  cadastrarConta(usuario: any, residente: any) {
    if (usuario.login !== null 
      && usuario.password !== null 
      && usuario.role !== null
      && residente.nome !== null 
      && residente.sobrenome !== null
      && residente.residencias[0].id !== null) 
    { 
      this.userService.criarUsuario(usuario).subscribe({
      next: response => {

          residente.condominio.id = response.condominio.id;
          residente.user.id = response.id;
          residente.email = response.login;
          this.residenteService.adicionarResidente(residente).subscribe({
            next: async () => {
              const result = await Swal.fire({
                title: 'Sucesso',
                text: 'Usuario Adicionado!',
                icon: 'success',
                confirmButtonText: 'OK'
              });
              if (result.isConfirmed || result.dismiss === Swal.DismissReason.close) {
                return window.location.reload();
              }
            },
            error: () => {
              return Swal.fire({
                title: 'Erro',
                text: 'Erro Ao Adicionar dados do residente!',
                icon: 'warning',
                confirmButtonText: 'OK'
              })
            }
          });
      },
      error: () => {
        return Swal.fire({
          title: 'Erro',
          text: 'Erro Ao Adicionar Login ou Senha!',
          icon: 'warning',
          confirmButtonText: 'OK'
        })
      }
      });
    } else {

        return Swal.fire({
          text: 'Faltam Alguns Campos!',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
    } return
     
  }
}
