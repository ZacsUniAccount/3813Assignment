import { Component, OnInit } from '@angular/core';
import { UserObjService } from '../services/userobj/userobj.service';
import { GroupService } from '../services/group/group.service';
import { ChannelService } from '../services/channel/channel.service';

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
  groups!: GroupService
  channels!: ChannelService
  selectedGroup!: string
  selectedChannel!: string
  channeltitle = Array()
  grouptitle = Array()

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

  //Find all groups and list them
  getGroups() {
    this.httpClient.get(BACKEND_URL + "/api/allGroups")
      .subscribe((data: any) => {
        this.groups = data.groups
        Object.entries(this.groups).forEach(([key, value], index) => {
          this.grouptitle.push(value.title)
        })
  });
  console.log(this.grouptitle)
  }

  //List all channels from group
  getChannel() {
    this.channeltitle = []
    Object.entries(this.groups).forEach(([key, value], index) => {
      console.log(this.selectedGroup + ":" + value.title)
      if(this.selectedGroup == value.title){
        console.log("matched: " + JSON.stringify(value.channel))
        this.channels = value.channel
      }
    })
    console.log(this.channels)
    Object.entries(this.channels).forEach(([key,value], index) => {
      this.channeltitle.push(value.title)
    })
    console.log("Titles: " + this.channeltitle)
  }
}
