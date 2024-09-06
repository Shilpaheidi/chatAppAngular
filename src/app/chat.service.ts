// src/app/services/chat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  // sendMessage(username: string, message: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}users/createUser?username=${username}&password=${message}, `);
  // }
  SignUpAuth(body:any):Observable<any>{
    // const body = { message };  // Assuming message is the content you're sending in the body
    return this.http.post(`${this.apiUrl}auth/sign-up`, body);
  }

  SignInAuth(body:any):Observable<any>{

    return this.http.post(`${this.apiUrl}auth/login`, body);
  }


  userSignUp(body:any):Observable<any>{

    return this.http.post(`${this.apiUrl}auth/signupusers`,body)
  }
  userLogin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}auth/loginusers?email=${email}&password=${password}`, {});
  }

  sendMessages(messages:string,sender:string,receiver:string){
      return this.http.post(`${this.apiUrl}users/sendMessages?message=${messages}&sender=${sender}&receiver=${receiver}`,{})
  }

  getUsersmessages(sender:string,receiver:string){
      return this.http.get(`${this.apiUrl}users/getUsersMessages?sender=${sender}&receiver=${receiver}`,{})
  }


  // http://localhost:3000/users/getUsersMessages?sender=john_doe&receiver=alice_wonder
  // http://localhost:3000/users/sendMessages?message=Alright%21%21%20Alice&sender=john_doe&receiver=alice_wonder
  
  // http://localhost:3000/users/sendMessages?message=Hello%20john&username=dummy11&password=123456


  // http://localhost:3000/auth/loginusers?email=dummy11%40gmail.com&password=123456
  // http://localhost:3000/auth/signupusers



  // http://localhost:3000/auth/login
  sendMessage(username: string, message: string): Observable<any> {
    const body = { message };  // Assuming message is the content you're sending in the body
    return this.http.post(`${this.apiUrl}chats/saveMessages?message=${message}&username=${username}`, body);
  }
  
  // http://localhost:3000/chats/saveMessages?message=hello%20shilpa&username=shilpa1
  // http://localhost:3000/users/createUser?username=shilpa2&password=123456

  getMessages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
