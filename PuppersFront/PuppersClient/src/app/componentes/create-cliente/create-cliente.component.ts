/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

import { ClienteService } from 'src/app/servicios/cliente.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { Router } from '@angular/router';
import { ArealocationService } from 'src/app/servicios/arealocation.service';
import { Area } from 'src/app/interfaces/area';
import { Localizacion } from 'src/app/interfaces/localizacion';
const now = new Date();
@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent {
  fecha = now;
  fechaString = this.fechaformat(this.fecha);
  clientes: Cliente[] = [];
  areas: Area[] = [];
  arrpresentar: Localizacion[] = [];
  localizaciones: Localizacion[] = [];
  localizaNew: Localizacion[] = [];
  selectedArea = 0;
  selectedLocation = 0;
  areaLoaded = false;
  newLocation = false;
  constructor(private cliService:ClienteService, private aloc:ArealocationService, private router:Router){
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

  email = new FormControl('', [Validators.required, Validators.email]);
  telefono = new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(11)]);
  cedula = new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(11)]);
  nombre = new FormControl('',[Validators.required]);
  link = new FormControl('',);
  newLocationName = new FormControl('',[Validators.required]);
  formValid = false;
  messageError = false;
  telclient: any = this.telefono.value;
  nomclient: any = this.nombre.value;
  emailclient: any = this.email.value;
  cedclient: any = this.cedula.value;
  linkclient: any = this.link.value;
  newLoc: any = this.newLocationName.value;
  respu: any;
  firstpart = "";
  secondpart = "";
  userclient = "";
  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  getErrorLocation(){
    let msg = ''
    if (this.newLocationName.hasError('required')){
      
      msg = 'Debe ingresar una nueva localizacion';
    }

    return msg;

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

  actualizarVistaLocations(){
    if(this.selectedLocation != -1){
      this.newLocation = false;
    }

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

  nuevaLocalizacion(){
    this.newLocation = true;

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

  createLocation(){
    if(!this.newLocationName.invalid){
      this.aloc.addLocation(this.newLoc,this.selectedArea).subscribe(respuesta =>{
        this.respu = respuesta as Localizacion;
        console.log(this.respu.location_id)
        alert("Nueva localizacion agregada.")
        

      })
    }
  }


  generarUserName(){
    const arreglonombres = this.nomclient.split(" ")
    this.firstpart = arreglonombres[0].slice(0,3)
    this.secondpart = arreglonombres[1].slice(0,3)
    const usuario = (this.firstpart + this.secondpart).toLowerCase();
    this.userclient = usuario;
  }

  getErrorNombre(){
    let msg = ''
    if (this.nombre.hasError('required')){
      
      msg = 'Debe ingresar un nombre y apellido';
    }

    return msg;

  }


  errorForm(){
    this.messageError = true;
    return 'Uno o mas parametros estan incorrectos. por favor revisa tus entradas!';

  }

  onSubmit(){
    if(this.newLocation){
      console.log("Revisando post")
      if(this.telefono.invalid || this.newLocationName.invalid || this.link.invalid || this.nombre.invalid || this.cedula.invalid || this.selectedArea == 0 || this.selectedLocation == 0){
          console.log("Error!");
          this.errorForm();
        }
      else{
          this.generarUserName();
          this.messageError = false;
          if(this.linkclient == ""){
            this.linkclient = "https://linknoasginado.com";
    
          }
          this.cliService.registerCliente(this.telclient, this.cedclient,this.nomclient,this.fechaString,this.emailclient,this.userclient,this.cedclient,this.respu.location_id,this.linkclient).subscribe(respuesta =>{
              
            alert("Se ha agregado el cliente.")
            this.router.navigate(['/manageboard'])
          })
        }
    }
    else{
      if(this.telefono.invalid || this.link.invalid || this.nombre.invalid || this.cedula.invalid || this.selectedArea == 0 || this.selectedLocation == 0){
        console.log("Error!");
        this.errorForm();
      }
      else{
        this.generarUserName();
        this.messageError = false;
        if(this.linkclient == ""){
          this.linkclient = "https://linknoasginado.com";
  
        }
        this.cliService.registerCliente(this.telclient, this.cedclient,this.nomclient,this.fechaString,this.emailclient,this.userclient,this.cedclient,this.selectedLocation,this.linkclient).subscribe(respuesta =>{
          console.log(respuesta)
          alert("Se ha agregado el cliente.")
          this.router.navigate(['/manageboard'])
        })
      }
    }

  }

}
