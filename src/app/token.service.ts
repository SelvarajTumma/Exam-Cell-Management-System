import { Injectable } from '@angular/core';
const token="auth_token";
const user_token="anth_user";
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  signOut(){
    window.sessionStorage.clear();
  }
  public saveToken(details:any){
    window.sessionStorage.removeItem(token);
    window.sessionStorage.setItem(token,details);
  }
  public getToken(){
    return sessionStorage.getItem(token);
  }
  public saveUser(user){
    window.sessionStorage.removeItem(user_token);
    window.sessionStorage.setItem(user_token,JSON.stringify(user))    
  }
  public getUser(){
    return JSON.parse(window.sessionStorage.getItem(user_token));
  }
}
