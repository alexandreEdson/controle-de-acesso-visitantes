import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VisitantesComponent } from './pages/visitantes/visitantes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VisitanteDetalheComponent } from './models/visitante-detalhe/visitante-detalhe.component';
import { ToastrModule } from 'ngx-toastr';
import { AdministracaoComponent } from './pages/administracao/administracao.component';
import { CadastrarUsuarioComponent } from './models/cadastrar-usuario/cadastrar-usuario.component';
import { ResidenciaDetalheComponent } from './models/residencia-detalhe/residencia-detalhe.component';
import { CondominioComponent } from './pages/condominio/condominio.component';
import { CondominioDetalheComponent } from './models/condominio-detalhe/condominio-detalhe.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VisitantesComponent,
    VisitanteDetalheComponent,
    AdministracaoComponent,
    CadastrarUsuarioComponent,
    ResidenciaDetalheComponent,
    CondominioComponent,
    CondominioDetalheComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
