import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

import { UserObjService } from '../services/userobj/userobj.service';
const BACKEND_URL = "http://localhost:3000";

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
  userobj!: UserObjService
  role!: string
  newUsername!: string;
  newEmail!: string;
  newRole!: string;

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    var data = sessionStorage.getItem('userobj');
    if (data) {
      try { this.userobj = JSON.parse(data) } catch { this.router.navigateByUrl('login') }
      this.role = this.userobj.role
      if (this.role == 'super admin') { } else {
        this.router.navigateByUrl('home')
      }
    }
  }

  createClicked() {
    if (this.newUsername == '' || this.newEmail == '' || !this.newRole) { alert('Please fill all options') } else {

      this.userobj.username = this.newUsername;
      this.userobj.email = this.newEmail;
      this.userobj.role = this.newRole;
      console.log(JSON.stringify(this.userobj))
      this.httpClient.post(BACKEND_URL + "/api/newuser", this.userobj, httpOptions)
        .subscribe((data: any) => {
          if (data.valid) {
            alert(data.msg)
          } else {
            alert(data.msg)
          }
        })
    }
  }

  backClicked(){
    this.router.navigateByUrl('home')
  }

}
