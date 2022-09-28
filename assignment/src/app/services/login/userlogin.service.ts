//Class to hold information entered by the use when logging in.
export class UserloginService {
  username: String
  password: String
  constructor(username: string, password: string) {
    this.username = username
    this.password = password
   }
}
