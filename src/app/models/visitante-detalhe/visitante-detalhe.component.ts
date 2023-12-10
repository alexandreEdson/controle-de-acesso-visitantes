import { Component, Inject, OnInit } from '@angular/core';
import { VisitanteService } from '../../services/visitante-service/visitante.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { ResidenteService } from '../../services/residente-service/residente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-visitante-detalhe',
  templateUrl: './visitante-detalhe.component.html',
  styleUrl: './visitante-detalhe.component.scss'
})
export class VisitanteDetalheComponent implements OnInit {

  constructor (
    public dialogRef: MatDialogRef<VisitanteDetalheComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private visitanteService: VisitanteService,
    private residenteService: ResidenteService) {
  }

  ngOnInit() {   
    this.getResidenciaId();
  }

  visitante: any = {
    entrada: null,
    nome: null,
    dataChegada: null,
    dataFim: null,
    residencia: {
      id: null
    },
    criador: {
      id: null
    },
    condominio: {
      id: null
    }
  };
  entradas: Array<String> = [
    "Permanente", "Uma vez", "A Prazo"
  ];

  getResidenciaId(){
    this.residenteService.getResidenteByUserId().subscribe({
      next: (response: any) => {
        if(response.residentes[0].residencias[0].id && response.residentes[0].id && response.residentes[0].condominioId) {
          this.visitante.residencia.id = response.residentes[0].residencias[0].id;
          this.visitante.criador.id = response.residentes[0].id;
          this.visitante.condominio.id = response.residentes[0].condominioId;
        }
      },
      error: (error: any) => {
        console.log('Erro ao Obter residentes:', error);
      }
  })
  }

  mensagemDeSucesso() {
    Swal.fire({
      title: 'Sucesso',
      text: 'Visitante Adicionado!',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.close) {
        this.cancelar();
        window.location.reload();
      } return
    });
  }

  mensagemDeErro() {
    Swal.fire({
      title: 'Erro',
      text: 'Erro Ao Adicionar Visitante!',
      icon: 'warning',
      confirmButtonText: 'OK'
    })
  }

  campoVazio() {
    Swal.fire({
      title: 'Erro',
      text: 'Preencha todos os campos obrigatórios corretamente e não esqueça de informar as horas',
      icon: 'warning',
      confirmButtonText: 'OK'
    })
  }


  adicionarVisitante(visitante: Object) {
    if (this.visitante.nome !== null && this.visitante.entrada !== null && this.visitante.dataChegada !== null) {
      this.visitanteService.addVisitante(visitante).subscribe({
        next: () =>{
          this.mensagemDeSucesso();
          this.cancelar()
        },
        error: () => {
          this.mensagemDeErro()
        }
      });
    } else {
      this.campoVazio()
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}