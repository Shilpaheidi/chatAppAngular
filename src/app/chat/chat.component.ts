// src/app/components/chat/chat.component.ts
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private socket!: Socket;
  username!: string;
  password!: string;
  receiver:string = 'alice_wonder';
  message!: string;
  messages: any[] = [];
  userData: any;

  constructor(private chatService: ChatService) {
    this.socket = io('http://localhost:3000', { // Change the port to match your NestJS server
      transports: ['websocket'], 
      withCredentials: true 
    });

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('message', (message: string) => {
      this.messages.push(message);
      console.log('messageArray', this.messages);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });
  }

  ngOnInit(): void {
    const storedData = localStorage.getItem('user');
    this.userData = storedData ? JSON.parse(storedData) : null;

    if (this.userData) {
      this.username = this.userData.username;
      this.password = this.userData.password;
      this.loadMessages();
    }
  }

  sendMessage(): void {
    this.socket.emit('message',  this.message,  this.username,  this.receiver ); 
    this.chatService.sendMessages(this.message, this.username, this.receiver).subscribe((res: any) => {
      this.messages = res;
      this.message = '';
      this.loadMessages(); // Refresh messages after sending
    });
  }

  loadMessages(): void {
    // Load messages logic
    this.chatService.getUsersmessages( this.username,  this.receiver ).subscribe((res:any)=>{
      this.messages = res;
    })
  }
}
