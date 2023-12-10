import { Component, OnInit } from '@angular/core';
import { VisitanteService } from '../../services/visitante-service/visitante.service';
import { MatTableDataSource } from '@angular/material/table';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VisitanteDetalheComponent } from '../../models/visitante-detalhe/visitante-detalhe.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-visitantes',
  templateUrl: './visitantes.component.html',
  styleUrls: ['./visitantes.component.scss'],
})
export class VisitantesComponent implements OnInit {
  visitantes: any[] = [];
  displayedColumns: string[] = ['nome', 'chegada', 'dataFim', 'entrada', 'remover'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  userId = localStorage.getItem('userId');

  constructor(
    private visitanteService: VisitanteService,
    private router: Router,
    public dialog: MatDialog
    ) {}

  ngOnInit() {
    this.getVisitantesByUserId();
    
  }

  adicionarVisitante(): void {
    const dialogRef = this.dialog.open(VisitanteDetalheComponent, {
      width: '40%',
      height: '550px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("ok");
    })
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getVisitantesByUserId() {
    this.visitanteService.getVisitantesByUserId(this.userId).subscribe({
      next: (response: any) => {
        this.visitantes = response['visitantes'];
        this.formatarDatas();
        this.dataSource.data = this.visitantes;
      },
      error: (error: any) => {
        console.log('Erro ao obter lista de visitantes:', error);
      },
    });
  }

// Função para atualizar a tela
atualizarTela() {
  // Obter o URL atual
  const currentUrl = this.router.url;

  // Navegar para a mesma rota (isso recarregará o componente)
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentUrl]);
  });
}

  deleteVisitante(id: number){
    this.visitanteService.deleteVisitante(id).subscribe({
      next: () => {
        this.atualizarTela();
      }
    })
  }

  private formatarDatas() {
    this.visitantes.forEach((visitante: any) => {
      // Se 'dataChegada' for um array, convertemos para um objeto Date
      if (Array.isArray(visitante.dataChegada)) {
        visitante.dataChegada = new Date(
          visitante.dataChegada[0],
          visitante.dataChegada[1] - 1,
          visitante.dataChegada[2],
          visitante.dataChegada[3] || 0,
          visitante.dataChegada[4] || 0
        );
      }

      if (Array.isArray(visitante.dataFim)) {
        visitante.dataFim = new Date(
          visitante.dataFim[0],
          visitante.dataFim[1] - 1,
          visitante.dataFim[2],
          visitante.dataFim[3] || 0,
          visitante.dataFim[4] || 0
        );
      }

      // Formatar a dataChegada no formato brasileiro sem GMT e fuso horário
      visitante.dataChegadaFormatada = visitante.dataChegada ? format(visitante.dataChegada, 'dd/MM/yy HH:mm', { locale: ptBR }) : '-';
      visitante.dataFimFormatada = visitante.dataFim ? format(visitante.dataFim, 'dd/MM/yy HH:mm', { locale: ptBR }) : '-';
    });
  }
}