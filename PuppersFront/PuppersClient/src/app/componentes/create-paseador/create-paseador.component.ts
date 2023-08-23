/* eslint-disable @typescript-eslint/no-explicit-any */
import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Cliente } from 'src/app/interfaces/cliente';
import { Router } from '@angular/router';
import { PaseadorService } from 'src/app/servicios/paseador.service';
const now = new Date();
import {AngularFireStorage} from "@angular/fire/compat/storage"

@Component({
  selector: 'app-create-paseador',
  templateUrl: './create-paseador.component.html',
  styleUrls: ['./create-paseador.component.css']
})
export class CreatePaseadorComponent {
  fecha = now;
  fechaString = this.fechaformat(this.fecha);
  clientes: Cliente[] = [];
  tipoSangre = ["A+","A-","B+","B-","AB+","AB-","O+","O-"]
  selectedbt = "default";
  linkdefault = "https://firebasestorage.googleapis.com/v0/b/puppersimage.appspot.com/o/puppers%2Fprofile.png?alt=media&token=0778deb9-2a8e-4e82-8f38-b42a7861c40c";
  constructor(private paseadorService:PaseadorService, private fireStorage:AngularFireStorage, private router:Router){
    this.telefono.valueChanges.subscribe(value =>{
      this.telefono.setValue(value,{emitEvent:false})
      this.telpaseador = this.telefono.value;
    })
    this.cedula.valueChanges.subscribe(value =>{
      this.cedula.setValue(value,{emitEvent:false})
      this.cedpaseador = this.cedula.value;
    })
    this.nombre.valueChanges.subscribe(value =>{
      this.nombre.setValue(value,{emitEvent:false})
      this.nompaseador = this.nombre.value;
    })

    this.addr.valueChanges.subscribe(value =>{
      this.addr.setValue(value,{emitEvent:false})
      this.addrpaseador = this.addr.value;
    })

    this.linkadd.valueChanges.subscribe(value =>{
      this.linkadd.setValue(value,{emitEvent:false})
      this.linkaddpaseador = this.linkadd.value;
    })

  }

  telefono = new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(12)]);
  cedula = new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(12)]);
  nombre = new FormControl('',[Validators.required]);
  addr = new FormControl('',[Validators.required]);
  linkadd = new FormControl('');
  formValid= false;
  messageError = false;
  telpaseador: any = this.telefono.value;
  nompaseador: any = this.nombre.value;
  cedpaseador: any = this.cedula.value;
  addrpaseador: any = this.addr.value;
  linkaddpaseador: any = this.linkadd.value;
  photopaseador = "";
  firstpart = "";
  secondpart = "";
  userpaseador = "";
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

  async onFileChange(event:any){
    const file = event.target.files[0]
    if(file){
      const path = `puppers/${file.name}`
      const uploadTask =await this.fireStorage.upload(path,file)
      this.photopaseador = await uploadTask.ref.getDownloadURL()
      console.log(this.photopaseador)
    }
  }

  getErrorCed(){
    let msg = ''
    if (this.cedula.hasError('required')){
      
      msg = 'Debe ingresar un numero de cedula';
    }

    if(this.cedula.hasError('maxlength') || this.cedula.hasError('minlength')){
      msg = 'Formato Invalido de cedula';
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


  getErrorAddr(){
    let msg = ''
    if (this.addr.hasError('required')){
      
      msg = 'Debe ingresar una localizacion';
    }

    return msg;

  }

  getErrorLink(){
    let msg = ''
    if (this.linkadd.hasError('required')){
      
      msg = 'Debe ingresar un link';
    }

    return msg;

  }

  generarUserName(){
    const arreglonombres = this.nompaseador.split(" ")
    this.firstpart = arreglonombres[0].slice(0,3)
    this.secondpart = arreglonombres[1].slice(0,3)
    const usuario = (this.firstpart + this.secondpart).toLowerCase();
    this.userpaseador = usuario;
  }


  

  errorForm(){
    this.messageError = true;
    return 'Uno o mas parametros estan incorrectos. por favor revisa tus entradas!';

  }

  onSubmit(){
    if(this.telefono.invalid || this.nombre.invalid || this.cedula.invalid || this.addr.invalid ){
      console.log("Error!");
      this.errorForm();
    }
    else{
      if(this.photopaseador == ""){
        this.photopaseador = this.linkdefault;
      }
      if(this.linkaddpaseador == ""){
        this.linkaddpaseador = "https://linknoasginado.com";

      }
      this.generarUserName();
      this.messageError = false;
      this.paseadorService.registerPaseador(this.cedpaseador,this.telpaseador,this.nompaseador,this.fechaString,this.userpaseador,this.cedpaseador,this.addrpaseador,this.linkaddpaseador,this.photopaseador,this.selectedbt).subscribe(respuesta =>{  
        console.log(respuesta);
        alert("Se ha agregado el paseador.")
        this.router.navigate(['/manageboard'])
      })
    }

  }

}
