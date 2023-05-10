import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginDataServices } from '../DataServices/login-data-services.service';
import { UserLogin } from '../Models/UserLogin';
import { Router } from '@angular/router';
import { AlertServices } from 'src/app/Shared/alert-services.service';

@Injectable({
  providedIn: 'root',
})
export class LoginServices {
  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private loginDataServices: LoginDataServices, private router: Router, private alertServices: AlertServices) {}

  login(email: string, password: string): void {
    let user: UserLogin = { email: email, password: password };

    this.loginDataServices.login(user).subscribe({
      next: (v) => {
        localStorage.setItem('token', v.token);
        this.router.navigate(['admin']);
      },
      error: (e) => {
        e.error.length > 0 ? this.alertServices.openAlertForInvalidUserOrPassword() : this.alertServices.openAlertError();
      }
    });
  }
}
