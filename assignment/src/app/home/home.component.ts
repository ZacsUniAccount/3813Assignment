import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserObjService } from '../services/userobj/userobj.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userobj!: UserObjService
  username!: string
  email!: string
  role!: string
  constructor(private router: Router) { }

  //Check a user is logged in before loading the page
  ngOnInit(): void {
    var data = sessionStorage.getItem('userobj');
    if (data) {
      try { this.userobj = JSON.parse(data) } catch {this.router.navigateByUrl('login')}
    this.username = this.userobj.username
    this.role = this.userobj.role
    } else {
      this.router.navigateByUrl('login')
    }
  }

  //When the edit user button is clicked, direct user to the newuser component
  usersClicked(){
    this.router.navigateByUrl('newuser')
  }

  //Direct user to the chat componenet when chat is clicked
  chatClicked(){
    this.router.navigateByUrl('chat')
  }

  //Clear the session storage and direct user to login page when 'logout' button is clicked
  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('login')
  }
}
