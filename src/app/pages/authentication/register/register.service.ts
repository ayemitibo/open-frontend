import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from '../../../../models'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {


  constructor(private http: HttpClient) { }

  register(value : Register) {
    return this.http.post<any>(`${environment.apiUrl}/auth/register`,value);
  }

}
