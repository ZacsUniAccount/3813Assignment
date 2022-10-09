//Class for the mongodb users
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { UserObjService } from '../userobj/userobj.service'
import { UserloginService } from '../login/userlogin.service';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private http:HttpClient) { }

  //Adds users to the database
  add(user:UserObjService){
    return this.http.post<any>('http://localhost:3000/api/add', user)
  }
  //Checks users credentials to log them in
  login(user:UserloginService){
    return this.http.post<any>('http://localhost:3000/api/login', user)
  }
  //Deletes users with username
  delete(user: object){
    console.log(user)
    return this.http.post<any>('http://localhost:3000/api/delete', user)
  }
  find(){
    return this.http.get('http://localhost:3000/api/find',)
  }
}
