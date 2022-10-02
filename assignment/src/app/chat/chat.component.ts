import { Component, OnInit } from '@angular/core';
import { UserObjService } from '../services/userobj/userobj.service';
import { GroupService } from '../services/group/group.service';
import { ChannelService } from '../services/channel/channel.service';
import { SocketService } from '../services/socket/socket.service';

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
  addchannel: string = "";
  members = Array();
  membertype = "group";
  newUser: string = "";

  messagecontent: string = ""
  messages: Array<any> = []
  ioConnection: any;

  constructor(private router: Router, private httpClient: HttpClient, private socketService: SocketService) { }

  ngOnInit(): void {
    var data = sessionStorage.getItem('userobj');
    if (data) {
      try { this.userobj = JSON.parse(data) } catch { this.router.navigateByUrl('login') }
      this.username = this.userobj.username
      this.role = this.userobj.role
    } else {
      this.router.navigateByUrl('login')
    }
    this.initIoConnection()
    this.getGroups()
  }

  //Find all groups and list them
  getGroups() {
    return new Promise((resolve) => {
      //const xhr = new XMLHttpRequest();
      this.grouptitle = []
      this.httpClient.get(BACKEND_URL + "/api/allGroups")
        .subscribe((data: any) => {
          this.groups = data.groups

          //foreach group
          Object.entries(this.groups).forEach(([key, value], index) => {
            if (this.role == 'user') { //if role is user
              value.users.forEach((user: any) => { //search through groups to find members with same username
                if (this.username == user) {
                  this.grouptitle.push(value.title)
                }
              });
            } else { //if role !user
              this.grouptitle.push(value.title) //add all groups
            }
          })
          resolve("done")
        });
    });

    //console.log(this.grouptitle)
  }


  //List all channels from group
  getChannel() {
    //console.log("getChannel running")
    this.channeltitle = []
    Object.entries(this.groups).forEach(([key, value], index) => {
      if (this.selectedGroup == value.title) {
        this.channels = value.channel
      }
    })
    Object.entries(this.channels).forEach(([key, value], index) => {
      if (this.role == 'user') {
        value.users.forEach((user: any) => {
          if (this.username == user) {
            this.channeltitle.push(value.title)
          }
        });
      } else {
        this.channeltitle.push(value.title)
      }
      //console.log(this.channeltitle)
    })
    this.getMembers()
  }

  channelClicked(channel: string) {
    this.selectedChannel = channel
    this.getMembers()
  }

  backClicked() {
    this.router.navigateByUrl('home')
  }

  addgroupClicked() {
    let grouptoadd: GroupService = { "title": this.addgroup, "users": [], "channel": [] }
    this.httpClient.post(BACKEND_URL + "/api/addGroup", grouptoadd, httpOptions)
      .subscribe((data: any) => {
        alert(data.msg)
        this.addgroup = ""
        this.getGroups()
      })
  }

  addchannelClicked() {
    let channeltoadd = { "group": this.selectedGroup, "channel": { "title": this.addchannel, "users": [] } }
    if (this.addchannel != "") {
      this.httpClient.post(BACKEND_URL + "/api/addChannel", channeltoadd, httpOptions)
        .subscribe((data: any) => {
          alert(data.msg)
          this.addchannel = ""
          this.getGroups()
            .then(() => this.getChannel())
        })
    }
  }

  getMembers() {
    this.members = []
    if (this.membertype == "group") {
      Object.entries(this.groups).forEach(([key, value], index) => {
        if (this.selectedGroup == value.title) {
          this.members.push(value.users)
          this.members = value.users
        }
      })
    } else {
      Object.entries(this.groups).forEach(([key, value], index) => {
        if (this.selectedGroup == value.title) {
          Object.entries(this.channels).forEach(([key, c], index) => {
            if (this.selectedChannel == c.title) {
              //console.log("matched: " + this.selectedChannel)
              this.members = c.users
            }
          })
        }
      })
    }
    console.log(this.members)
  }

  addUser() {
    let i = this.members.findIndex(user => (user == this.newUser))
    let sendUser = {"user": this.newUser, "group": this.selectedGroup}
    if (i == -1 && this.newUser != "") {
      if (this.membertype == "group") {
        this.httpClient.post(BACKEND_URL + "/api/addGroupUser", sendUser, httpOptions)
          .subscribe((data: any) => {
            alert(data.msg)
            this.newUser = ""
            this.getGroups()
              .then(() => this.getChannel())
          })
      } else {
        this.httpClient.post(BACKEND_URL + "/api/addChannelUser", sendUser, httpOptions)
          .subscribe((data: any) => {
            alert(data.msg)
            this.newUser = ""
            this.getGroups()
              .then(() => this.getChannel())
          })
      }
    } else {alert("user is empty or already exists in " + this.membertype)}
  }

  private initIoConnection() {
    this.socketService.initSocket()
    this.ioConnection = this.socketService.getMessage()
      .subscribe((message) => {
        //add new message to messages array
        this.messages.push(message);
      });
  }

  chat() {
    if(this.messagecontent) {
      //Check there is a message to send
      this.socketService.send(this.messagecontent);
      //this.messagecontent=null;
    } else {
      console.log("no message")
    }
  }
}


