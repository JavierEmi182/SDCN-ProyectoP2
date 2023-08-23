import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { SidenavComponent } from './common/sidenav/sidenav.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { CalendarComponent } from './componentes/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule } from '@angular/common/http';
import { DataboardComponent } from './componentes/databoard/databoard.component';
import { MatTableModule } from '@angular/material/table';
import { PaseadorComponent } from './componentes/paseador/paseador.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HomeclienteComponent } from './componentes/homecliente/homecliente.component';
import { PaseadorprofileComponent } from './componentes/paseadorprofile/paseadorprofile.component';
import { PaseadorGuard } from './servicios/paseador.guard';
import { ClienteGuard } from './servicios/cliente.guard';
import { AuthyGuard } from './servicios/authy.guard';
import { AdminGuard } from './servicios/admin.guard';
import { ManageboardComponent } from './componentes/manageboard/manageboard.component';
import { AdminClienteComponent } from './componentes/admin-cliente/admin-cliente.component';
import { AdminPaseadorComponent } from './componentes/admin-paseador/admin-paseador.component';
import { AdminMascotaComponent } from './componentes/admin-mascota/admin-mascota.component';
import { CreateMascotaComponent } from './componentes/create-mascota/create-mascota.component';
import { CreatePaseadorComponent } from './componentes/create-paseador/create-paseador.component';
import { CreateClienteComponent } from './componentes/create-cliente/create-cliente.component';
import { EditMascotaComponent } from './componentes/edit-mascota/edit-mascota.component';
import { EditPaseadorComponent } from './componentes/edit-paseador/edit-paseador.component';
import { EditClienteComponent } from './componentes/edit-cliente/edit-cliente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageuploadComponent } from './common/imageupload/imageupload.component';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import { environment } from 'src/environments/environment';
import { AdminServicioComponent } from './componentes/admin-servicio/admin-servicio.component';
import { EditServicioComponent } from './componentes/edit-servicio/edit-servicio.component';
import { AddServicioComponent } from './componentes/add-servicio/add-servicio.component';
import { CambiarcontrasenaComponent } from './componentes/cambiarcontrasena/cambiarcontrasena.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ClienteComponent,
    NavbarComponent,
    SidenavComponent,
    DashboardComponent,
    CalendarComponent,
    DataboardComponent,
    PaseadorComponent,
    HomeclienteComponent,
    PaseadorprofileComponent,
    ManageboardComponent,
    AdminClienteComponent,
    AdminPaseadorComponent,
    AdminMascotaComponent,
    CreateMascotaComponent,
    CreatePaseadorComponent,
    CreateClienteComponent,
    EditMascotaComponent,
    EditPaseadorComponent,
    EditClienteComponent,
    ImageuploadComponent,
    AdminServicioComponent,
    EditServicioComponent,
    AddServicioComponent,
    CambiarcontrasenaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,  
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatExpansionModule,
    MatTooltipModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    FullCalendarModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [
     PaseadorGuard, ClienteGuard, AuthyGuard, AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
