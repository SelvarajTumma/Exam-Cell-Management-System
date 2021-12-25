import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  constructor(private tokenservice:TokenService) { }

  ngOnInit() {
  }
  Logout(){
    console.log("clicked");
    this.tokenservice.signOut();
  } 
}
