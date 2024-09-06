import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  signinForm: FormGroup;
  email!: string;
  passowrd!: string;
  constructor(private fb: FormBuilder, private chatservice: ChatService, private router: Router) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {

    if (this.signinForm.valid) {
      const { email, password } = this.signinForm.value;
      this.email = email;
      this.passowrd = password;
      this.chatservice.userLogin(this.email, this.passowrd).subscribe((res) => {
        console.log('res', res);

        if ((res as any).statusCode == 200) {

          console.log('res.data',res.data);
          
          const dataToStore = res?.data || {}; // Use an empty object or a default value if undefined
          localStorage.setItem('user', JSON.stringify(dataToStore));
          this.router.navigate(['/chat']);
        }
        if ((res as any).success == true) {
          this.router.navigate(['/chat']);
        }
      }, (err) => {
        if (err.error.success == false) {
          alert(err.error.message);
        }
        console.log('err', err);
      })
    }
  }

}
