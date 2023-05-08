import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from '../Models/UserLogin';
import { environment } from 'src/environments';
import { Injectable } from '@angular/core';
import { UserToken } from '../Models/UserToken';

@Injectable({
  providedIn: 'root',
})
export class LoginDataServices {
  constructor(private http: HttpClient) {}

  login(user: UserLogin): Observable<UserToken> {
    return this.http.post<UserToken>(`${environment.urlAPI}Login`, user);
  }
}
