import { ChannelService } from "../channel/channel.service"

//Class for holding channels
export class GroupService {
  title: string //Groups need a title
  users: Array<string> //Groups need users
  channel: Array<ChannelService> //Groups need channels
  
  constructor(title:string, users:[string], channel:[ChannelService]){
   this.title = title
   this.users = users
   this.channel = channel
  }
 }