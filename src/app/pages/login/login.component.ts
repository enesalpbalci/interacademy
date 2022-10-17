import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { TokenDto, UserForLoginDto } from 'src/app/models/model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  users: string[] = [];

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: this.formBuilder.control('', Validators.required),
      passWord: this.formBuilder.control('', Validators.required),
    });
  }

  hide: boolean = false;

  login() {
    let postData: UserForLoginDto = Object.assign({}, this.loginForm.value);
    this.authService.login(postData).subscribe(res => {
      alert('Giriş başarılı');
      localStorage.setItem("token",res.token);
      this.loginForm.reset();
      this.router.navigate(['/']);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
