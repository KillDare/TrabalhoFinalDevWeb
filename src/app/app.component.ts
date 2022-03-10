import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TrabalhoFinal';
  constructor(
    private authService: AuthService,
    private router: Router
  ){  }

  logout(){
    this.authService.signout();
    this.router.navigate(['login']);
    document.getElementById("logout")?.classList.add('d-none');
  }
}
