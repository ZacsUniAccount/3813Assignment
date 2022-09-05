//Class for holding user information
export class UserObjService {
  username: string
  email: string
  role: string
  valid: boolean
  
  constructor(username:string, email:string, role:string, valid: boolean){
   this.username = username
   this.role = role
   this.email = email
   this.valid = valid
  }
 }
 