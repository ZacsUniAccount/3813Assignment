//Class for holding channels
export class ChannelService {
  title: string
  users: Array<string>
  
  constructor(title:string, users:[string]){
   this.title = title
   this.users = users
  }
 }
 