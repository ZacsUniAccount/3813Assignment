import { Component, OnInit } from '@angular/core';
import { UserObjService } from '../services/userobj/userobj.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

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
    this.email = this.userobj.email
    this.role = this.userobj.role
    } else {
      this.router.navigateByUrl('login')
    }
  }

}
