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

  //Load the users information, and get all users before the page loads
  ngOnInit(): void {
    var data = sessionStorage.getItem('userobj');
    console.log(data)
    if (data) {
      try { this.userobj = JSON.parse(data) } catch { this.router.navigateByUrl('login') }
      this.role = this.userobj.role
      console.log(this.role)
      if (this.role == 'super admin' || this.role == 'group admin') { } else {
        this.router.navigateByUrl('home')
      }
      if (this.role == 'super admin') {
        this.super = true
      }
      
    }
    
    this.getUsers()
  }

  //Gets all users from the allUsers endpoint
  //Currently broken as it needs updating to the mongo system
  getUsers() {
    this.userData.find().subscribe((data: any) => {
      if (data.err == null) {this.activeUsers = data.users}
    })
  }

  //When the create user button is clicked
  createClicked() {
    if (!this.super) { this.newRole = 'user' } //If no user type is selected, assume they are a regular user
    //Check all fields are filled in
    if (this.newUsername == '' || this.newPassword == '' || !this.newRole || this.newRole == "") { alert('Please fill all options') } else {
      this.userobj = new UserObjService(this.newUsername, this.newPassword, this.newRole) //Add new details to an object
      this.userData.add(this.userobj).subscribe((data) => { //from the userdata service file, add the user to the mongodb
        if (data.err != null) {alert("Error: " + data.err);} else {
         alert("new user (" + this.newUsername + ") was added as a " + this.newRole);//Confirmation message
          this.getUsers() 
        }
        //Clear all fields
        this.newUsername = ""
        this.newPassword = ""
        this.newRole = ""
      })
    }
     //Update current users
  }

  //Remove selected user when clicked
  removeClicked() {
    let remove = {"user": this.selectedUser} //Get selected user
    if (this.selectedUser == "super") { alert("super can not be removed, they are the main admin.") } else { //Don't let the superadmin be removed
      this.userData.delete(remove).subscribe((data) => {
        if (data.err) {alert("Something went wrong")} else {
          alert(data.msg)
          this.getUsers()
        }
      })
    }
  }

  //Navigate the user back to the home page
  backClicked() {
    this.router.navigateByUrl('home')
  }

}
