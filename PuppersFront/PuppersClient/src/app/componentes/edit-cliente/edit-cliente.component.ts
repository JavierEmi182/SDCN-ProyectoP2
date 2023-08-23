/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { Area } from 'src/app/interfaces/area';
import { Localizacion } from 'src/app/interfaces/localizacion';
import { ArealocationService } from 'src/app/servicios/arealocation.service';
const now = new Date();
@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent {

  fecha = now;
  fechaString = this.fechaformat(this.fecha);
  clientes: Cliente[] = [];
  areas: Area[] = [];
  localizaciones: Localizacion[] = [];
  areaCl: Area[] = [];
  locaCl: Localizacion[] = [];
  selectedArea = "";
  selectedLocation = "";
  id_s = '';
  mascotasAsignadas: Mascota[] = [];
  cliente: Cliente[] = [];
  clienteInfo!: Cliente;
  locaClInfo!: Localizacion;
  areaClInfo!: Area;
  constructor(private route:ActivatedRoute,private aloc:ArealocationService,private mascotaService:MascotaService, private cliService:ClienteService, private router:Router){
    cliService.getClientes().subscribe(respuesta => {
      this.clientes = respuesta as Cliente[];
    })

    aloc.getAreas().subscribe(respuesta =>{
      this.areas = respuesta as Area[];
    })

    aloc.getLocations().subscribe(respuesta =>{
      this.localizaciones = respuesta as Localizacion[];
    })

    this.telefono.valueChanges.subscribe(value =>{
      this.telefono.setValue(value,{emitEvent:false})
      this.telclient = this.telefono.value;
    })

    this.nombre.valueChanges.subscribe(value =>{
      this.nombre.setValue(value,{emitEvent:false})
      this.nomclient = this.nombre.value;
    })
    this.username.valueChanges.subscribe(value =>{
      this.username.setValue(value,{emitEvent:false})
      this.userclient = this.username.value;
    })

    this.email.valueChanges.subscribe(value =>{
      this.email.setValue(value,{emitEvent:false})
      this.emailclient = this.email.value;
    })

    this.cedula.valueChanges.subscribe(value =>{
      this.cedula.setValue(value,{emitEvent:false})
      this.cedclient = this.cedula.value;
    })

    this.link.valueChanges.subscribe(value =>{
      this.link.setValue(value,{emitEvent:false})
      this.linkclient = this.link.value;
    })

    this.newLocationName.valueChanges.subscribe(value =>{
      this.newLocationName.setValue(value,{emitEvent:false})
      this.newLoc = this.newLocationName.value;
    })

  }

  ngOnInit(){

    const {id} = this.route.snapshot.params;
    this.id_s = id;
    this.cliService.getCliente(id).subscribe(respuesta2 =>{
      this.cliente = respuesta2 as Cliente[];
      this.clienteInfo = this.cliente[0];
      console.log(this.clienteInfo);
      this.telefono.setValue(this.clienteInfo.client_tel,{emitEvent:false});
      this.nombre.setValue(this.clienteInfo.client_name,{emitEvent:false});
      this.username.setValue(this.clienteInfo.client_user,{emitEvent:false});
      this.link.setValue(this.clienteInfo.address_link,{emitEvent:false});
      this.email.setValue(this.clienteInfo.client_email,{emitEvent:false});
      this.cedula.setValue(this.clienteInfo.client_ID,{emitEvent:false});
      this.aloc.getLocation(this.clienteInfo.location_id).subscribe(respuesta =>{
        this.locaCl = respuesta as Localizacion[];
        this.locaClInfo = this.locaCl[0];
        this.selectedLocation = this.locaClInfo.location_id.toString();
        this.aloc.getArea(this.locaClInfo.area_id).subscribe(respuesta =>{
          this.areaCl = respuesta as Area[];
          this.areaClInfo = this.areaCl[0];
          this.getDataAreaLocation(this.areaClInfo.area_id);
          this.selectedArea = this.areaClInfo.area_id.toString();
          this.telclient = this.telefono.value;
          this.nomclient = this.nombre.value;
          this.userclient = this.username.value;
          this.emailclient = this.email.value;
          this.cedclient = this.cedula.value;
          this.linkclient = this.link.value;
        })

      })
      
    })


    this.mascotaService.getMascotabyClient(id).subscribe(respuesta =>{
      this.mascotasAsignadas = respuesta as Mascota[];
      console.log(this.mascotasAsignadas)
    })

  }

  email = new FormControl('', [Validators.required, Validators.email]);
  telefono = new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(11)]);
  cedula = new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(11)]);
  nombre = new FormControl('',[Validators.required]);
  username = new FormControl('',[Validators.required]);
  link = new FormControl('', [Validators.required, Validators.minLength(30)]);
  newLocationName = new FormControl('',[Validators.required]);
  formValid = false;
  messageError = false;
  telclient: any = this.telefono.value;
  nomclient: any = this.nombre.value;
  userclient: any = this.username.value;
  emailclient: any = this.email.value;
  cedclient: any = this.cedula.value;
  linkclient: any = this.link.value;
  newLoc: any = this.newLocationName.value;
  arrpresentar: Localizacion[] = [];
  areaLoaded = false; 
  newLocation = false;
  respu: any;
  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  fechaformat(date: Date){
    return ([
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-'))
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debe ingresar un mail!';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorLocation(){
    let msg = ''
    if (this.newLocationName.hasError('required')){
      
      msg = 'Debe ingresar una nueva localizacion';
    }

    return msg;

  }

  getErrorCel(){
    let msg = ''
    if (this.telefono.hasError('required')){
      
      msg = 'Debe ingresar un telefono';
    }

    if(this.telefono.hasError('maxlength') || this.telefono.hasError('minlength')){
      msg = 'Formato Invalido de Telefono';
    }

    return msg;
  }

  getErrorNombre(){
    let msg = ''
    if (this.nombre.hasError('required')){
      
      msg = 'Debe ingresar un nombre y apellido';
    }

    return msg;

  }

  actualizarVistaLocations(){
    if(this.selectedLocation != "-1"){
      this.newLocation = false;
    }

  }

  nuevaLocalizacion(){
    this.newLocation = true;

  }

  createLocation(){
    if(!this.newLocationName.invalid){
      this.aloc.addLocation(this.newLoc,parseInt(this.selectedArea)).subscribe(respuesta =>{
        this.respu = respuesta as Localizacion;
        console.log(this.respu.location_id)
        alert("Nueva localizacion agregada.")

      })
    }
  }

  getDataAreaLocation(id: number){
    this.arrpresentar = [];
    for(const locrec of this.localizaciones){
      if(locrec.area_id == id){
        this.arrpresentar.push(locrec)
      }
    }
    this.areaLoaded = true


  }

  getErrorUsername(){
    let msg = ''
    if (this.username.hasError('required')){
      
      msg = 'Debe ingresar un usuario';
    }

    return msg;

  }

  getErrorLink(){
    let msg = ''
    if (this.link.hasError('required')){
      
      msg = 'Debe ingresar un link';
    }

    if(this.link.hasError('minlength')){
      msg = 'Formato Invalido de link';
    }

    return msg;
  }
  
  getErrorCed(){
    let msg = ''
    if (this.cedula.hasError('required')){
      
      msg = 'Debe ingresar una cedula';
    }

    if(this.cedula.hasError('maxlength') || this.cedula.hasError('minlength')){
      msg = 'Formato Invalido de cedula';
    }

    return msg;
  }

  errorForm(){
    this.messageError = true;
    return 'Uno o mas parametros estan incorrectos. por favor revisa tus entradas!';

  }

  onSubmit(){

    if(parseInt(this.selectedArea) == 0 || parseInt(this.selectedLocation) == 0){
      console.log("Error!");
      this.errorForm();
    }
    else{
      this.messageError = false;
      this.selectedLocation = this.respu.location_id;
      this.cliService.updateCliente(this.telclient,this.cedclient,this.nomclient,this.fechaString,this.emailclient,parseInt(this.selectedLocation),this.linkclient).subscribe(respuesta =>{
        console.log(respuesta);
        console.log("Insertado!")
        this.router.navigate(['/manageboard'])
      })
    }

  }

}
