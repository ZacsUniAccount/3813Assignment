import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { UserObjService } from '../userobj/userobj.service'

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private http:HttpClient) { }

  add(user:UserObjService){
    return this.http.post<any>('http://localhost:3000/api/add', user)
  }
  read(){
    return this.http.get<any>('http://localhost:3000/api/read')
  }
  update(user:UserObjService){
    return this.http.post<any>('http://localhost:3000/api/update', user)
  }
  remove(userID: any){
    return this.http.post<any>('http://localhost:3000/api/remove', {'userid': userID})
  }
  checkvalidid(userID: any){
    return this.http.post<any>('http://localhost:3000/api/checkvalidid', {'user': userID})
  }
}
