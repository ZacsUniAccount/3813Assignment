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

  usersClicked(){
    this.router.navigateByUrl('newuser')
  }

  chatClicked(){
    this.router.navigateByUrl('chat')
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('login')
  }
}
