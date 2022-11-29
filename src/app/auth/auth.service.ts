import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimerId : any;

  constructor(private http: HttpClient, private router:Router) {}

  private handleError(err:HttpErrorResponse){
    let errMsg = '';
    switch(err.error.error.message){
      case 'EMAIL_EXISTS': {
        errMsg = 'Email already exists!';
        break;
      }
      case 'INVALID_PASSWORD': {
        errMsg = 'Invalid Credentials!';
        break;
      }
      case 'EMAIL_NOT_FOUND': {
        errMsg = 'Email not Found!';
        break;
      }
      default: {
        errMsg = 'an unknown error has occured!';
      }
    }
    return throwError(() => errMsg);
  }

  private handleUser(email:string, id:string, token:string, expiresIn:number){
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
    this.onAutoLogout(expiresIn * 1000);
    localStorage.setItem('user', JSON.stringify(user));
  }

  onSignup(email: string, password: string) {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCdao_-DFJQprkTSftXICYPe9O33ElLT64',
      {
        email,
        password,
        returnSecureToken: true,
      }
    ).pipe(catchError(this.handleError), tap(res => {
      this.handleUser(res.email, res.localId, res.idToken, +res.expiresIn);
    }));
  }

  onLogin(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCdao_-DFJQprkTSftXICYPe9O33ElLT64',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.handleUser(res.email, res.localId, res.idToken, +res.expiresIn);
        })
      );
  }

  onLogout(){
    this.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/auth']);
    if(this.tokenExpirationTimerId) clearTimeout(this.tokenExpirationTimerId);
    this.tokenExpirationTimerId = null;
  }

  onAutoLogin(){
    const curUser:{
      email:string,
      id:string,
      _token:string,
      _tokenExpirationDate:string
    } = JSON.parse(localStorage.getItem('user'));
    if(!curUser) return;

    const loadedUser = new User(curUser.email, curUser.id, curUser._token, new Date(curUser._tokenExpirationDate));
    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration = new Date(curUser._tokenExpirationDate).getTime() - new Date().getTime();
      this.onAutoLogout(expirationDuration);
    }
  }

  onAutoLogout(expirationDuration:number){
    this.tokenExpirationTimerId = setTimeout(() => {
      this.onLogout();
    }, expirationDuration);
  }
}
