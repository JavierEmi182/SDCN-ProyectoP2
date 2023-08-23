/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Cliente } from 'src/app/interfaces/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { PaseadorService } from 'src/app/servicios/paseador.service';
import { Paseador } from 'src/app/interfaces/paseador';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
const now = new Date();
@Component({
  selector: 'app-edit-paseador',
  templateUrl: './edit-paseador.component.html',
  styleUrls: ['./edit-paseador.component.css']
})
export class EditPaseadorComponent {
  fecha = now;
  fechaString = this.fechaformat(this.fecha);
  clientes: Cliente[] = [];
  selectedArea = 'default';
  selectedLocation = 'default';
  tipoSangre = ["A+","A-","B+","B-","AB+","AB-","O+","O-"]
  selectedbt = "default";
  constructor(private fireStorage:AngularFireStorage, private mascotaService:MascotaService, private route:ActivatedRoute,private paseadorService:PaseadorService, private router:Router){
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
    this.username.valueChanges.subscribe(value =>{
      this.username.setValue(value,{emitEvent:false})
      this.userpaseador = this.username.value;
    })

    this.addr.valueChanges.subscribe(value =>{
      this.addr.setValue(value,{emitEvent:false})
      this.addrpaseador = this.addr.value;
    })

    this.linkadd.valueChanges.subscribe(value =>{
      this.linkadd.setValue(value,{emitEvent:false})
      this.linkaddpaseador = this.linkadd.value;
    })

    this.photo.valueChanges.subscribe(value =>{
      this.photo.setValue(value,{emitEvent:false})
      this.photopaseador = this.photo.value;
    })
  }

  telefono = new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(12)]);
  cedula = new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(12)]);
  nombre = new FormControl('',[Validators.required]);
  username = new FormControl('',[Validators.required]);
  addr = new FormControl('',[Validators.required]);
  linkadd = new FormControl('',[Validators.required]);
  photo = new FormControl('',[Validators.required]);
  formValid= false;
  messageError = false;
  telpaseador: any = this.telefono.value;
  nompaseador: any = this.nombre.value;
  userpaseador: any = this.username.value;
  cedpaseador: any = this.cedula.value;
  addrpaseador: any = this.addr.value;
  linkaddpaseador: any = this.linkadd.value;
  photopaseador: any = this.photo.value;
  paseador: Paseador[] = [];
  paseadorInfo!: Paseador;
  mascotasAsignadas: Mascota[] = [];
  id_s = '';
  ngOnInit(){
    const {id} = this.route.snapshot.params;
    this.id_s = id;

    this.paseadorService.getPaseador(id).subscribe(respuesta2 =>{
      this.paseador = respuesta2 as Paseador[];
      this.paseadorInfo = this.paseador[0];
      this.telefono.setValue(this.paseadorInfo.walker_tel,{emitEvent:false})
      this.cedula.setValue(this.paseadorInfo.walker_ID,{emitEvent:false})
      this.nombre.setValue(this.paseadorInfo.walker_name,{emitEvent:false})
      this.username.setValue(this.paseadorInfo.walker_user,{emitEvent:false})
      this.linkadd.setValue(this.paseadorInfo.walker_linkaddress,{emitEvent:false})
      this.addr.setValue(this.paseadorInfo.walker_address,{emitEvent:false})
      this.photo.setValue(this.paseadorInfo.walker_photoURL,{emitEvent:false})
      this.userpaseador = this.username.value;
      this.nompaseador = this.nombre.value;
      this.cedpaseador = this.cedula.value;
      this.telpaseador = this.telefono.value;
      this.addrpaseador = this.addr.value;
      this.linkaddpaseador = this.linkadd.value;
      this.photopaseador = this.photo.value;
      this.selectedbt = this.paseadorInfo.walker_bloodtype;
    })

    this.mascotaService.getMascotabyWalker(id).subscribe(respuesta =>{
      this.mascotasAsignadas = respuesta as Mascota[];
    })
    
    
  }

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

  async onFileChange(event:any){
    const file = event.target.files[0]
    if(file){
      const path = `puppers/${file.name}`
      const uploadTask =await this.fireStorage.upload(path,file)
      this.photopaseador = await uploadTask.ref.getDownloadURL()
      console.log(this.photopaseador)
    }
  }

  getErrorUsername(){
    let msg = ''
    if (this.username.hasError('required')){
      
      msg = 'Debe ingresar un usuario';
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

  getErrorPhoto(){
    let msg = ''
    if (this.photo.hasError('required')){
      
      msg = 'Debe ingresar una foto';
    }

    return msg;

  }


  

  errorForm(){
    this.messageError = true;
    return 'Uno o mas parametros estan incorrectos. por favor revisa tus entradas!';

  }
  

  onSubmit(){
    console.log(this.cedpaseador);
    if(this.telefono.invalid || this.nombre.invalid || this.cedula.invalid || this.username.invalid || this.addr.invalid || this.photo.invalid || this.linkadd.invalid){
      console.log("Error!");
      this.errorForm();
    }
    else{
      this.messageError = false;
      this.paseadorService.updatePaseador(this.cedpaseador,this.telpaseador,this.nompaseador,this.fechaString,this.addrpaseador,this.linkaddpaseador,this.photopaseador,this.selectedbt).subscribe(respuesta =>{  
        console.log(respuesta)
        this.router.navigate(['/manageboard'])
      })
    }

  }

}
