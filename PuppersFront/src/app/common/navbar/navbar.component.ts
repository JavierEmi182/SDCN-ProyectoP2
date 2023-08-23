import { Component } from '@angular/core';
import { TokenService } from 'src/app/servicios/token.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private tokSer:TokenService){

  }

  logout(): void {
    this.tokSer.signOut();
    window.location.reload();
  }


}
