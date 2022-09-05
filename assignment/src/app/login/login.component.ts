import { Component, OnInit } from '@angular/core';

import { UserloginService } from '../services/login/userlogin.service';
import { UserObjService } from '../services/userobj/userobj.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = ""
  userlogin!: UserloginService;
  userobj!: UserObjService;
  
  constructor() { }

  ngOnInit(): void {
  }

  public loginClicked() {
    console.log("Login button clicked")
  }

}
