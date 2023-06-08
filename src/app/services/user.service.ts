import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'http://localhost:8080/api/v1/user';
  private userSubject!: BehaviorSubject<User | null>;
  public user!: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.user = this.userSubject.asObservable();
  }

  public login(user: any): Observable<User> {
    return this.http.post<User>(`${this.url}/login`, user).pipe(
      map((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      })
    );
  }
  public userValue() {
    return this.userSubject.value;
  }
  public logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  public signup(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, user).pipe(
      map((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      })
    );
  }
}
