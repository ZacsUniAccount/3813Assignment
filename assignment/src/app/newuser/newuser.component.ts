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
    this.getUsers()
  }

  //Gets all users from the allUsers endpoint
  //Currently broken as it needs updating to the mongo system
  getUsers() {
    this.httpClient.get(BACKEND_URL + "/api/allUsers")
      .subscribe((data: any) => {
        this.activeUsers = (data.users)
      });
  }

  //When the create user button is clicked
  createClicked() {
    if (!this.super) { this.newRole = 'user' } //If no user type is selected, assume they are a regular user
    //Check all fields are filled in
    if (this.newUsername == '' || this.newPassword == '' || !this.newRole || this.newRole == "") { alert('Please fill all options') } else {
      this.userobj = new UserObjService(this.newUsername, this.newPassword, this.newRole) //Add new details to an object
      this.userData.add(this.userobj).subscribe((data) => { //from the userdata service file, add the user to the mongodb
        if (data.err == null) { console.log("new product (" + this.newUsername + ") was added") } else { //Confirmation message
          alert("Error: " + data.err);
        }
        //Clear all fields
        this.newUsername = ""
        this.newPassword = ""
        this.newRole = ""
      })
    }
    this.getUsers() //Update current users
  }

  //Remove selected user when clicked
  removeClicked() {
    let remove = { 'user': this.selectedUser } //Get selected user
    if (this.selectedUser == "super") { alert("super can not be removed, they are the main admin.") } else { //Don't let the superadmin be removed
      this.httpClient.post(BACKEND_URL + '/api/deleteUser', remove, httpOptions) //Call deleteuser endpoint and give them the selected user
        .subscribe((data: any) => {
          alert(data.msg) //confirmation message
          this.getUsers() //Update current users
        })
    }

  }

  //Navigate the user back to the home page
  backClicked() {
    this.router.navigateByUrl('home')
  }

}
