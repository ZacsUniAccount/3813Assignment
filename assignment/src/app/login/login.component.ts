import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserdataService } from '../services/userdata/userdata.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

import { UserloginService } from '../services/login/userlogin.service';
import { UserObjService } from '../services/userobj/userobj.service';
const BACKEND_URL = "http://localhost:3000";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = ""
  password: string = ""
  userlogin: UserloginService = { username: '', password: '' }
  userobj: UserObjService = { username: "", password: "", role: "" }

  constructor(private router: Router, private httpClient: HttpClient, private userData: UserdataService) { }

  ngOnInit(): void {
  }

  //when the login button is clicked
  public loginClicked() {
    this.userlogin = new UserloginService(this.username, this.password) //Get the entered credentials

    //Use the userdata service to check the mongodb with entered credentials
    this.userData.login(this.userlogin).subscribe((data) => {
      if (data.err == null) { //If no error is returned
        console.log(data.result)
        this.userobj.username = data.username;
        this.userobj.role = data.role;
        sessionStorage.setItem('userobj', JSON.stringify(this.userobj)); //Set the sessionstorage to remember the user
        this.router.navigateByUrl('/home'); //Redirect them to home
      } else {
        alert("Error: " + data.err); //Otherwise, display an error message and allow them to login again
      }
      //Clear the forms
      this.password = ""
      this.username = ""
    })
  }
}
