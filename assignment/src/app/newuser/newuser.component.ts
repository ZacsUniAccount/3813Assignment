import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserdataService } from '../services/userdata/userdata.service';

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
  newPassword!: string;
  super = false;
  activeUsers!: [];
  selectedUser!: string;

  constructor(private router: Router, private httpClient: HttpClient, private userData: UserdataService) { }

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
    if (this.newUsername == '' || this.newPassword == '' || !this.newRole || this.newRole == "") { alert('Please fill all options') } else {
      this.userobj = new UserObjService(this.newUsername, this.newPassword, this.newRole)
      console.log(this.userobj)
      this.userData.add(this.userobj).subscribe((data) => {
        if (data.err == null) { console.log("new product (" + this.newUsername + ") was added")  } else {
          alert("Error: " + data.err);
        }
        this.newUsername = ""
        this.newPassword = ""
        this.newRole = ""
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
