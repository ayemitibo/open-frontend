import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { Register } from '../../../../models'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {
  constructor(private router: Router,private authService: RegisterService) {}
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6)]) || '',
    email: new FormControl('', [Validators.required]) || '',
    password: new FormControl('', [Validators.required]) || '',
  });

  get f() {
    return this.form.controls;
  }
  

  async submit() {
    // this.router.navigate(['/dashboard']);
      this.authService.register(this.form.value as Register).subscribe(
        (response) => {
          console.log(response,'response')
          // Handle successful login
        },
        (error) => {
          // Handle login error
          console.log(error,'error')
        }
      )
  }
}
