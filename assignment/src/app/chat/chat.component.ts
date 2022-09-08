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
  addgroup!: string;

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
    this.grouptitle = []
    this.httpClient.get(BACKEND_URL + "/api/allGroups")
      .subscribe((data: any) => {
        this.groups = data.groups

        //foreach group
        Object.entries(this.groups).forEach(([key, value], index) => {
          if (this.role == 'user'){ //if role is user
            value.users.forEach((user:any) => { //search through groups to find members with same username
              if(this.username == user){
                this.grouptitle.push(value.title)
              }
            });
          } else { //if role !user
            this.grouptitle.push(value.title) //add all groups
          }
        })
  });
  //console.log(this.grouptitle)
  }


  //List all channels from group
  getChannel() {
    this.channeltitle = []
    Object.entries(this.groups).forEach(([key, value], index) => {
      if(this.selectedGroup == value.title){
        this.channels = value.channel
      }
    })
    Object.entries(this.channels).forEach(([key,value], index) => {
      if (this.role == 'user'){
        value.users.forEach((user: any) => {
          if (this.username == user) {
            this.channeltitle.push(value.title)
          }
        });
      } else {
      this.channeltitle.push(value.title)
      }
    })
  }

  channelClicked(channel: string){
    this.selectedChannel = channel
  }

  backClicked() {
    this.router.navigateByUrl('home')
  }

  addgroupClicked() {
    let temp: GroupService = {"title": this.addgroup, "users": [], "channel":[]}
    console.log(temp)
    this.httpClient.post(BACKEND_URL + "/api/addGroup", temp, httpOptions)
        .subscribe((data: any) => {
          alert(data.msg)
          this.addgroup = ""
          this.getGroups()
        })
        
  }
  
}
