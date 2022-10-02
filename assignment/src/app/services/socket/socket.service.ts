import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import io from 'socket.io-client';
const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  private socket;
  constructor() { }

  //Setup connection to socket server
  initSocket() {
    this.socket = io(SERVER_URL)
    return () =>{this.socket.disconnect()}
  }

  //Emit a message to socket server
  send(message: string) {
    this.socket.emit('message', message);
  }

  //Listen for "message" events from socket server
  getMessage() {
    return new Observable(observer => {
      this.socket.on('message', (data) => {observer.next(data)
      });
    });
  }
}
