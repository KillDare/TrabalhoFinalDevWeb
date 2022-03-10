import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    senha: '',
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ){ }

  ngOnInit(): void {
  }

  login(){
    this.authService.singin(this.user).subscribe((res:any) => {
      console.log(res);
      localStorage.setItem('token',res.token);
      this.router.navigate(['private']);
    });
  }

}
