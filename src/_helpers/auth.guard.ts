import { Injectable } from '@angular/core';
import { RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from '../app/pages/authentication/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate() {
        const user = this.loginService.userValue || localStorage.getItem('user');

        console.log(user,'user')
        
        if (user) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/authentication/login']);
        return false;
    }
}
