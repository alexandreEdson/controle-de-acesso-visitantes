import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { VisitantesComponent } from './pages/visitantes/visitantes.component';
import { VisitanteDetalheComponent } from './models/visitante-detalhe/visitante-detalhe.component';
import { AdministracaoComponent } from './pages/administracao/administracao.component';
import { CadastrarUsuarioComponent } from './models/cadastrar-usuario/cadastrar-usuario.component';
import { ResidenciaDetalheComponent } from './models/residencia-detalhe/residencia-detalhe.component';
import { CondominioComponent } from './pages/condominio/condominio.component';
import { CondominioDetalheComponent } from './models/condominio-detalhe/condominio-detalhe.component';

const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'visitantes', component: VisitantesComponent },
  { path: 'visitanteDetalhe', component: VisitanteDetalheComponent },
  { path: 'administração', component: AdministracaoComponent},
  { path: 'criar-conta', component: CadastrarUsuarioComponent },
  { path: 'residencia/cadastrar', component: ResidenciaDetalheComponent },
  { path: 'condominio', component: CondominioComponent },
  { path: 'condominioDetalhe', component: CondominioDetalheComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
