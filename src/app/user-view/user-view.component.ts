import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  Logout(){
    console.log("clicked");
    this.router.navigate(["login"]);
  }
}
