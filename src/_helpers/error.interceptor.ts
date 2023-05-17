import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { LoginService } from '../app/pages/authentication/login/login.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService,private toastr: ToastrService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status)) {
                console.log(err?.error?.message,'err')
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                // this.loginService.logout();
                this.toastr.error(err?.error?.message, 'Error');
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}