import { Component } from '@angular/core';
import { CondominioService } from '../../services/condominio-service/condominio.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; 

@Component({
  selector: 'app-condominio-detalhe',
  templateUrl: './condominio-detalhe.component.html',
  styleUrl: './condominio-detalhe.component.scss'
})
export class CondominioDetalheComponent {

  constructor (
    private condominioService: CondominioService,
    public dialogRef: MatDialogRef<CondominioDetalheComponent>
  ) {}

  condominio: any = {
    nome: null,
    endereco: null,
    sobre: null
  };

  mensagemDeErro() {
    Swal.fire({
      title: 'Erro',
      text: 'Erro Ao Adicionar Condominio!',
      icon: 'warning',
      confirmButtonText: 'OK'
    })
  }

  mensagemDeSucesso() {
    Swal.fire({
      title: 'Sucesso',
      text: 'Condominio Adicionado!',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.close) {
        this.cancelar();
        window.location.reload();
      } return
    });
  }

  campoVazio() {
    Swal.fire({
      title: 'Erro',
      text: 'Preencha todos os campos obrigatórios corretamente e não esqueça de informar as horas',
      icon: 'warning',
      confirmButtonText: 'OK'
    })
  }

  criarCondominio(condominio: any) {
    this.condominioService.createCondominio(condominio).subscribe({
      next: () => {
        this.mensagemDeSucesso();
        this.cancelar();
      },
      error: () => {
        this.mensagemDeErro()
      }
    })
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
