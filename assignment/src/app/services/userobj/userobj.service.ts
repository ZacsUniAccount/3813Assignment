//Class for holding user information
export class UserObjService {
  username: string
  email: string
  role: string
  
  constructor(username:string, email:string, role:string){
   this.username = username
   this.role = role
   this.email = email
  }
 }
 