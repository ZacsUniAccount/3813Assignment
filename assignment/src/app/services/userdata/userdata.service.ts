import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { UserObjService } from '../userobj/userobj.service'
import { UserloginService } from '../login/userlogin.service';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private http:HttpClient) { }

  add(user:UserObjService){
    return this.http.post<any>('http://localhost:3000/api/add', user)
  }
  login(user:UserloginService){
    return this.http.post<any>('http://localhost:3000/api/login', user)
  }
}
