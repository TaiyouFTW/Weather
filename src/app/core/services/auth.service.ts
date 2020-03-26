import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@shared/models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this._currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('CurrentUser')));
    this.currentUser = this._currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this._currentUserSubject.value;
  }

  // --- Methods ---
  login(name: string, login: string, password: string) {
    return this.http.post<any>(environment.urlApi + `Authentication/login`, { name, login, password })
      .pipe(map(user => {
        localStorage.setItem('CurrentUser', JSON.stringify(user));
        this._currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    this._currentUserSubject.next(null);
    localStorage.removeItem('CurrentUser');
    localStorage.clear();
  }
}
