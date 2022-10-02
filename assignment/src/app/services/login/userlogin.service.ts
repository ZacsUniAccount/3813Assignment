//Class to hold information entered by the use when logging in.
export class UserloginService {
  username: String //A login needs a username
  password: String //A login needs a password
  constructor(username: string, password: string) {
    this.username = username
    this.password = password
   }
}
