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

  public loginClicked() {
    this.userlogin = new UserloginService(this.username, this.password)


    this.userData.login(this.userlogin).subscribe((data) => {
      if (data.err == null) {
        console.log(data.result)
        this.userobj.username = data.username;
        this.userobj.role = data.role;
        sessionStorage.setItem('userobj', JSON.stringify(this.userobj));
        this.router.navigateByUrl('/home');
      } else {
        alert("Error: " + data.err);
      }
      this.password = ""
      this.username = ""
    })
  }

  /*
  this.httpClient.post(BACKEND_URL + "/api/auth", this.userlogin, httpOptions)
    .subscribe((data: any) => {
      //alert(JSON.stringify(data.valid))
      if (data.valid) {
        this.userobj.username = data.user.username;
        this.userobj.role = data.user.role;
        sessionStorage.setItem('userobj', JSON.stringify(this.userobj));
        this.router.navigateByUrl('/home');
      }
    })
}
*/

}
