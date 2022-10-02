//Class for holding channels
export class ChannelService {
  title: string //Channels have a title 
  users: Array<string> //Channels have users
  
  constructor(title:string, users:[string]){
   this.title = title
   this.users = users
  }
 }
 