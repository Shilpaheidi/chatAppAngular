// src/app/services/chat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/chats';

  constructor(private http: HttpClient) {}

  sendMessage(username: string, message: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, message });
  }

  getMessages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
