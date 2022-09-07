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
  super = false;
  activeUsers!: [];
  selectedUser!: string;

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    var data = sessionStorage.getItem('userobj');
    if (data) {
      try { this.userobj = JSON.parse(data) } catch { this.router.navigateByUrl('login') }
      this.role = this.userobj.role
      if (this.role == 'super admin' || this.role == 'group admin') { } else {
        this.router.navigateByUrl('home')
      }
      if (this.role == 'super admin') {
        this.super = true
      }
    }

    this.getUsers()
  }

  getUsers() {
    this.httpClient.get(BACKEND_URL + "/api/allUsers")
      .subscribe((data: any) => {
        //alert(JSON.stringify(data.valid))
        this.activeUsers=(data.users)
        console.log(this.activeUsers)
  });
}
  createClicked() {
    if (!this.super) {this.newRole = 'user'}
    if (this.newUsername == '' || this.newEmail == '' || !this.newRole) { alert('Please fill all options') } else {
      this.userobj.username = this.newUsername;
      this.userobj.email = this.newEmail;
      this.userobj.role = this.newRole;
      if (this.super) {this.userobj.role = this.newRole;}
      console.log(JSON.stringify(this.userobj))
      this.httpClient.post(BACKEND_URL + "/api/newuser", this.userobj, httpOptions)
        .subscribe((data: any) => {
          alert(data.msg)
        })
    }
    this.getUsers()
  }

  removeClicked(){
    let remove = {'user': this.selectedUser}
    console.log(remove)
    if (this.selectedUser == "super") { alert("super can not be removed, they are the main admin.")} else {
      this.httpClient.post(BACKEND_URL + '/api/deleteUser', remove, httpOptions)
        .subscribe((data: any) => {
          alert(data.msg)
          this.getUsers()
        })
    }
    
  }

  backClicked(){
    this.router.navigateByUrl('home')
  }

}
