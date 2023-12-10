import { Component, OnInit } from '@angular/core';
import { VisitanteService } from '../../services/visitante-service/visitante.service';
import { MatTableDataSource } from '@angular/material/table';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { ptBR } from 'date-fns/locale';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user-service/user.service';
import { ResidenteService } from '../../services/residente-service/residente.service';
import { CadastrarUsuarioComponent } from '../../models/cadastrar-usuario/cadastrar-usuario.component';
import { ResidenciaDetalheComponent } from '../../models/residencia-detalhe/residencia-detalhe.component';

@Component({
  selector: 'app-administracao',
  templateUrl: './administracao.component.html',
  styleUrl: './administracao.component.scss'
})
export class AdministracaoComponent implements OnInit {
  visitantes: any[] = [];
  residentes: any[] = [];
  displayedColumns: String[] = ['unidade', 'nome', 'chegada', 'entrada', 'remover'];
  residenteColumns: String[] = ['unidade', 'nome', 'email', 'acesso', 'remover'];
  dataVisitantes: MatTableDataSource<any> = new MatTableDataSource();
  dataResidentes: MatTableDataSource<any> = new MatTableDataSource();
  userId = localStorage.getItem('userId');
  buttonName: String = 'Residentes';
  titleName: String = 'Visitantes';

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private visitanteService: VisitanteService,
    private residenteService: ResidenteService,
    private userService: UserService
    ) {}

  ngOnInit() {
    if(localStorage.getItem('role') === 'MANAGER'){
      this.getAllVisitantesByCondominio();
      this.getAllResidenteByCondominio();
    }
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
      confirmButtonText: 'Sim'
    }).then((response) => {
      //Se clicar em Sim
      if (response.isConfirmed) this.logout()
    })
  }

  changeTable(): void {
    if (this.buttonName == 'Residentes') {
        this.buttonName = 'Visitantes';
        this.titleName = 'Residentes';
    } else {
      this.buttonName = 'Residentes';
      this.titleName = 'Visitantes';
    }
  }

  cadastrarUsuario(): void {
    const dialogRef = this.dialog.open(CadastrarUsuarioComponent, {
      width: '40%',
      height: '700px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("ok");
    })
  }

  cadastrarResidencia(): void {
    const dialogRef = this.dialog.open(ResidenciaDetalheComponent, {
      width: '40%',
      height: '350px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("ok");
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataVisitantes.filter = filterValue.trim().toLowerCase();
    this.dataResidentes.filter = filterValue.trim().toLowerCase();
  }

  getAllVisitantesByCondominio() {
    this.visitanteService.getAllVisitantesByCondominio().subscribe({
      next: (response: any) => {
        this.visitantes = response['visitantes'];
        this.formatarDatas();
        this.dataVisitantes.data = this.visitantes;
      },
      error: (error: any) => {
        console.log('Erro ao obter lista de visitantes:', error);
      },
    });
  }

  getAllResidenteByCondominio() {
    this.residenteService.getResidenteByCondominioId().subscribe({
      next: response => {
        this.residentes = response['residentes']
        this.dataResidentes.data = this.residentes;
      } 
    })
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
        this.visitantes = this.visitantes.filter(visitante => visitante.id !== id);
        this.dataVisitantes.data = this.visitantes;
      }
    })
  }

  apagarUsuario(residente: any): void {
    if (localStorage.getItem('userId') !== residente.userId) {
      if (localStorage.getItem('role') === 'MANAGER' && residente.role !== 'MANAGER') {
        this.userService.apagarUsuario(residente.userId).subscribe({
              next: () => {
                this.atualizarTela();
              }
        });
      } else if(localStorage.getItem('role') === 'ADMIN' && residente.role !== 'MANAGER') {
        this.userService.apagarUsuario(residente.userId).subscribe({
              next: () => {
                this.atualizarTela();
              }
        });
      }
    } else {
      Swal.fire({
        title: 'Erro',
        text: 'Você não pode apagar a sí próprio',
        icon: 'warning',
        confirmButtonText: 'Ok!'
      })
    }
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