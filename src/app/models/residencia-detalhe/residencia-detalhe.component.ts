import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ResidenciaService } from '../../services/residencia-service/residencia.service';


@Component({
  selector: 'app-residencia-detalhe',
  templateUrl: './residencia-detalhe.component.html',
  styleUrl: './residencia-detalhe.component.scss'
})
export class ResidenciaDetalheComponent {

  constructor (
    public dialogRef: MatDialogRef<ResidenciaDetalheComponent>,
    private residenciaService: ResidenciaService,
  ) {}

  residenciaObj = {
    unidade: null,
    descricao: null,
    criador: {
      id: localStorage.getItem('userId')
    },
    condominio: {
      id: localStorage.getItem('condominioId')
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  cadastrarResidencia(residencia: any) {
    this.residenciaService.postResidencia(residencia).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Sucesso!',
          text: `Unidade ${response.unidade} criada`,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed || result.dismiss === Swal.DismissReason.close) {
            this.cancelar();
            window.location.reload();
          } return
        });
        
        //Fechar Dialog
        this.cancelar()
      },
      error: err => {
        Swal.fire({
          title: 'Erro!',
          text: `Ocorreu um erro ao cadastrar uma nova residencia`,
          icon: 'warning',
          confirmButtonText: 'OK'
        })
      }
    })

  }


}
