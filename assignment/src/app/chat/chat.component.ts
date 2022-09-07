import { Component, OnInit } from '@angular/core';
import { UserObjService } from '../services/userobj/userobj.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const BACKEND_URL = "http://localhost:3000";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  userobj!: UserObjService
  username!: string
  role!: string

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    var data = sessionStorage.getItem('userobj');
    if (data) {
      try { this.userobj = JSON.parse(data) } catch {this.router.navigateByUrl('login')}
    this.username = this.userobj.username
    this.role = this.userobj.role
    } else {
      this.router.navigateByUrl('login')
    }

    this.getGroups()
  }

  getGroups() {
    this.httpClient.get(BACKEND_URL + "/api/allGroups")
      .subscribe((data: any) => {
        console.log(JSON.stringify(data.groups))
  });
  }
}
