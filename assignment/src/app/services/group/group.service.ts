import { ChannelService } from "../channel/channel.service"

//Class for holding channels
export class GroupService {
  title: string
  users: Array<string>
  channel: Array<ChannelService>
  
  constructor(title:string, users:[string], channel:[ChannelService]){
   this.title = title
   this.users = users
   this.channel = channel
  }
 }