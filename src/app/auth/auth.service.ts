import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthData } from "./auth-data.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isStaffAuthenticated = false;
  private isAdminAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAdminAuth() {
    return this.isAdminAuthenticated;
  }

  getIsStaffAuth() {
    return this.isStaffAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createStaffUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post("http://localhost:3000/api/user/addstaff", authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(email: string,
    password: string,
    nextUrl: string) {

    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{
        token: string; expiresIn: number, userId: string,
        isAdmin: boolean, isStaff: boolean, isStudent: boolean, isInstructor: boolean
      }>(
        "http://localhost:3000/api/user/login",
        authData
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          if (response.isAdmin) {
            this.isAdminAuthenticated = true;
          }

          if (response.isStaff) {
            this.isStaffAuthenticated = true;
          }

          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate, this.userId, this.isStaffAuthenticated, this.isAdminAuthenticated );
          this.router.navigate([nextUrl || "/"]);
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAdminAuthenticated = authInformation.isAdminAuthenticated;
      this.isStaffAuthenticated = authInformation.isStaffAuthenticated;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAdminAuthenticated = false;
    this.isStaffAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string,
    expirationDate: Date,
    userId: string,
    isStaffAuthenticated: boolean,
    isAdminAuthenticated: boolean) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("isStaffAuthenticated", String(isStaffAuthenticated));
    localStorage.setItem("isAdminAuthenticated", String(isAdminAuthenticated));
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("isStaffAuthenticated");
    localStorage.removeItem("isAdminAuthenticated");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const isStaffAuthenticated = localStorage.getItem("isStaffAuthenticated");
    const isAdminAuthenticated = localStorage.getItem("isAdminAuthenticated");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      isStaffAuthenticated: isStaffAuthenticated === 'true',
      isAdminAuthenticated: isAdminAuthenticated === 'true'
    };
  }
}

