import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ){ }

  singin(user:any){
    return this.http.post(`${this.URL}/user/singin`, user);
  }

  singup(user:any){
    return this.http.post(`${this.URL}/user/signup`, user);
  }

  signout(){
    localStorage.clear();
  }

  exist(user:any){
    return this.http.post(`${this.URL}/user/exist`, user);
  }

  decoded(user:any){
    return this.http.post(`${this.URL}/user/decoded`, user);
  }

  isAuth():boolean{
    const token = localStorage.getItem('token');
    if(this.jwtHelper.isTokenExpired(token ? token:undefined) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }
}
