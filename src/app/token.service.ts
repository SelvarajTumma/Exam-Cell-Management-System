import { Injectable } from '@angular/core';
const token="auth_token";
const user_token="anth_user";
const admin_token="auth_admin";
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  signOut(){
    window.sessionStorage.clear();
  }
  // public saveToken(details:any){
  //   window.sessionStorage.removeItem(token);
  //   window.sessionStorage.setItem(token,details);
  // }
  // public getToken(){
  //   return window.sessionStorage.getItem(token);
  // }
  public saveUser(user){
    window.sessionStorage.removeItem(user_token);
    window.sessionStorage.setItem(user_token,JSON.stringify(user))    
  }
  public getUser(){
    return JSON.parse(sessionStorage.getItem(user_token));
  }
  public isAuthenticated(){
    var value=window.sessionStorage.getItem(user_token);
    return value;
  }
  public saveAdmin(admin){
    window.sessionStorage.removeItem(admin_token);
    window.sessionStorage.setItem(user_token,JSON.stringify(admin));
  }
  public getAdmin(){
    return JSON.parse(sessionStorage.getItem(admin_token));
  }
  public adminAuthenticated(){
    const value=window.sessionStorage.getItem(admin_token);
    return value;
  }
}
