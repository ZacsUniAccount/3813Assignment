//Class for holding user information
export class UserObjService {
  username: string //A user needs a username
  password: string //A user needs a password
  role: string //A user needs a role
  
  constructor(username:string, password: string, role:string,){
   this.username = username
   this.password = password
   this.role = role
  }
 }
 