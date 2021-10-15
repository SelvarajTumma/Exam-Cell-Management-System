import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userLoggedIn:BehaviorSubject<boolean> =new BehaviorSubject<boolean>(false);
  private adminloggedIn:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  constructor(private router:Router) { }
  getUserLoggedIn(){
    return this.userLoggedIn.asObservable;
  }
  loginUser(user){
    this.userLoggedIn.next(true);
  }
  loginAdmin(admin){
    this.adminloggedIn.next(true);
  }
  userLogout(){
    this.userLoggedIn.next(false);
    this.router.navigate(["/login"]);
  }
  adminLogout(){
    this.adminloggedIn.next(false);
    this.router.navigate(["/login"]);
  }
}
