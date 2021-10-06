import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  signOut(){
    window.sessionStorage.clear();
  }
  public getToken(){
    return sessionStorage.getItem('key')
  }
}
