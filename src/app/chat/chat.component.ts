// src/app/components/chat/chat.component.ts
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
// import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  username!: string;
  message!: string;
  messages: { user: string; message: string }[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  sendMessage(): void {
    this.chatService.sendMessage(this.username, this.message).subscribe(() => {
      this.message = '';
      this.loadMessages(); // Refresh messages after sending
    });
  }

  loadMessages(): void {
    this.chatService.getMessages().subscribe(messages => {
      this.messages = messages;
    });
  }
}
