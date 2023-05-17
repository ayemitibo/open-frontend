import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Login } from '../../../../models'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  constructor(private router: Router,private loginService: LoginService) {}
  form = new FormGroup({
    email: new FormControl('', [Validators.required]) || '',
    password: new FormControl('', [Validators.required]) || '',
  });

  

  async submit() {
    // this.router.navigate(['/dashboard']);
      this.loginService.login(this.form.value as Login).subscribe(
        (response) => {
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          // Handle login error
          console.log(error,'error')
        }
      )
  }
}
