//Class for holding user information
export class UserObjService {
  username: string
  password: string
  role: string
  
  constructor(username:string, password: string, role:string,){
   this.username = username
   this.password = password
   this.role = role
  }
 }
 