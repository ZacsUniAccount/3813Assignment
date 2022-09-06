import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserObjService } from '../services/userobj/userobj.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
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
