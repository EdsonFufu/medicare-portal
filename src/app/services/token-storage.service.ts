import { Injectable } from '@angular/core';
import {User} from "../models/user";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const SESSION_ID = 'session-id';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }


  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public saveSessionId(sessionId: string): void {
    window.sessionStorage.removeItem(SESSION_ID);
    window.sessionStorage.setItem(SESSION_ID, sessionId);
  }

  public getSessionId(): string | null {
    return window.sessionStorage.getItem(SESSION_ID);
  }

  public saveUser(user: User): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return undefined;
  }
}
