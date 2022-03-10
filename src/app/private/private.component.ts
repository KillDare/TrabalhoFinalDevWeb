import jwt_decode from "jwt-decode";
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})

export class PrivateComponent implements OnInit {

  token = localStorage.getItem('token');
  decoded = {
    email:'',
    idlogin: Number
  };
  user = {
    userName: '',
    email: '',
    senha: '',
    fullname: '',
  }



  constructor(
    private authService: AuthService
  ) {  }

  ngOnInit(): void {
    document.getElementById("logout")?.classList.remove('d-none');

    this.decoded = jwt_decode(this.token||'');

    console.log(JSON.stringify(this.decoded));
    let x = this.decoded;

    this.authService.decoded(this.decoded).subscribe((res:any) => {
      this.user = res;
      console.log(this.user);
    });
  }

}
