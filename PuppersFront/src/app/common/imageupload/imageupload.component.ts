/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage"
@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css']
})
export class ImageuploadComponent {
  constructor(private fireStorage:AngularFireStorage){}

   async onFileChange(event:any){
    const file = event.target.files[0]
    if(file){
      const path = `puppers/${file.name}`
      const uploadTask =await this.fireStorage.upload(path,file)
      const url = await uploadTask.ref.getDownloadURL()
      console.log(url)
    }
  }
}
