import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';
// import { Router } from 'express';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private chatservice: ChatService,private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { username,email, password } = this.signupForm.value;

      this.chatservice.userSignUp({username, email, password }).subscribe((res) => {
        console.log('res', res);

        if ((res as any).success == true) {
          this.router.navigate(['/home']);
        }

        if ((res as any).success == false) {
          // this.router.navigate(['/home']);

          alert(res.message)
        }
      },(err)=>{

        if (err.error.success == false) {
          alert(err.error.message)
        }
        console.log('err',err);
        
      });
      console.log('Signup successful!', email, password);
    
    }
  }
}
