import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = {
    userName: '',
    email: '',
    senha: '',
    fullname: '',
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ){
  }

  ngOnInit(): void {
  }

  register(){
    if (this.user.userName && this.user.email && this.user.senha && this.user.fullname){
      this.authService.exist(this.user).subscribe((res:any) => {
        console.log("res:", res);
        if (res == false){
          this.authService.singup(this.user).subscribe((res:any) => {
            this.router.navigate(['login']);
          });
        } else{
          alert("Usuario ou Email já castrados");
        }
      });
    } else {
      alert("Preencha todos os campos");
    }

  }

}
