import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CondominioService } from '../../services/condominio-service/condominio.service';
import { CondominioDetalheComponent } from '../../models/condominio-detalhe/condominio-detalhe.component';

@Component({
  selector: 'app-condominio',
  templateUrl: './condominio.component.html',
  styleUrl: './condominio.component.scss'
})
export class CondominioComponent implements OnInit {

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['nome', 'endereco', 'sobre', 'remover'];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private condominioService: CondominioService
    ) {}

    ngOnInit(): void {
      this.pegarCondominios()
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    logout(): void {
      // Limpar dados do localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
      localStorage.removeItem('condominioId')
  
      // Redirecionar para a página de login
      this.router.navigate(['/login']);
    }
  
    async sair() {
      return await Swal.fire({
        title: 'Sair',
        text: 'Tem Certeza que deseja realizar essa operação?',
        icon: 'info',
        confirmButtonText: 'Sim',
        showCloseButton: true,
      }).then((response) => {
        //Se clicar em Sim
        if (response.isConfirmed) this.logout()
      })
    }

    //Aplica um "-" em elementos vazios das linhas na tabela
    valoresVazios() {
      this.dataSource.data.forEach(condominio => {
        condominio.endereco = condominio.endereco ? condominio.endereco : '-';
        condominio.sobre = condominio.sobre ? condominio.sobre : '-';
      })
    }

    abrirCondominioModal(): void {
      const dialogRef = this.dialog.open(CondominioDetalheComponent, {
        width: '40%',
        height: '430px'
      });
      dialogRef.afterClosed().subscribe(() => {  
      })
    }

    pegarCondominios() {
      this.condominioService.getCondominios().subscribe({
        next: response => {
          this.dataSource.data = response;
          this.valoresVazios()
        },
        error: err => {
          
        }
      })
    }

    apagarCondominio(condominio: any) {
      Swal.fire({
        icon: 'warning',
        title: 'Esta ação não poderá ser desfeita',
        text: `Você tem certeza que deseja apagar o condominio ${condominio.nome}`,
        showCloseButton: true,
        confirmButtonText: 'Sim'
      }).then(
        (result) => {
          if(result.isConfirmed) {
            this.condominioService.deleteCondominio(condominio.id).subscribe({
              next: reponse => {
                window.location.reload();
              },
              error: err => {

              }
            })
          }  
        }
      )  
    }
}
