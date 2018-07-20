import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthData } from "./auth-data.model";
import { AuthType } from "./auth-type.model";
import { environment } from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isStaffAuthenticated = false;
  private isAdminAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<AuthType>();

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

  createUser(email: string,
    name: string,
    password: string,
    isStaff: boolean,
    isAdmin: boolean,
    nextUrl: string) {
    const authData: AuthData = { email: email, name: name, password: password , isStaff: isStaff, isAdmin: isAdmin};
    const url = environment.server + '/api/user/addstaff';
    this.http
      .post(url, authData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate([nextUrl || "/"]);
      });
  }

  login(email: string,
    password: string,
    nextUrl: string) {

    const authData: AuthData = { email: email, password: password };
    const url = environment.server + '/api/user/login';
    console.log('sending post request to ', url);
    this.http
      .post<{
        token: string; expiresIn: number, userId: string,
        isAdmin: boolean, isStaff: boolean, isStudent: boolean, isInstructor: boolean
      }>(
        url,
        authData
      )
      .subscribe(response => {
        console.log("response=", response);
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

          this.triggerAuthChangeEvent();
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

      this.triggerAuthChangeEvent();
    }
  }

  // send out an auth change event to those listening
  triggerAuthChangeEvent() {
    const authType: AuthType = {
      staffAuth: this.isStaffAuthenticated,
      adminAuth: this.isAdminAuthenticated
    };
    this.authStatusListener.next(authType);
  }

  // return current auth
  getAuth() {
    const authType: AuthType = {
      staffAuth: this.isStaffAuthenticated,
      adminAuth: this.isAdminAuthenticated
    };
    return authType;
  }

  logout() {
    this.token = null;
    this.isAdminAuthenticated = false;
    this.isStaffAuthenticated = false;
    this.triggerAuthChangeEvent();
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

