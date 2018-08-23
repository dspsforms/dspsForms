import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthData } from "./auth-data.model";
import { AuthType } from "./auth-type.model";
import { environment } from "../../environments/environment";
import { UrlConfig } from "../model/url-config";

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

  private dataInitialized = false;
  constructor(private http: HttpClient, private router: Router) {}





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
        this.router.navigate([nextUrl || UrlConfig.SHOW_USERS_ABSOLUTE]);
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
          this.saveAuthDataLocalStorage(token, expirationDate, this.userId, this.isStaffAuthenticated, this.isAdminAuthenticated );
          this.router.navigate([nextUrl || "/"]);
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthDataLocalStorage();
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
  // refresh from local storage, in case user reloads page
  getAuth() {

    this.refreshAuthDataFromLocalStorage();
    const authType: AuthType = {
      staffAuth: this.isStaffAuthenticated,
      adminAuth: this.isAdminAuthenticated
    };
    return authType;
  }

  getToken() {
    if (!this.dataInitialized) {
      this.refreshAuthDataFromLocalStorage();
    }
    return this.token;
  }

  getIsAdminAuth() {
    if (!this.dataInitialized) {
      this.refreshAuthDataFromLocalStorage();
    }
    return this.isAdminAuthenticated;
  }

  getIsStaffAuth() {
    if (!this.dataInitialized) {
      this.refreshAuthDataFromLocalStorage();
    }
    return this.isStaffAuthenticated;
  }


  logout() {
    this.token = null;
    this.isAdminAuthenticated = false;
    this.isStaffAuthenticated = false;
    this.triggerAuthChangeEvent();
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthDataLocalStorage();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthDataLocalStorage(token: string,
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

  private clearAuthDataLocalStorage() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("isStaffAuthenticated");
    localStorage.removeItem("isAdminAuthenticated");
  }

  private getAuthDataLocalStorage() {
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

  refreshAuthDataFromLocalStorage() {

    // TODO use expirationDate
    const tmpAuth = this.getAuthDataLocalStorage();
    if (tmpAuth) {
      this.isAdminAuthenticated = tmpAuth.isAdminAuthenticated;
      this.isStaffAuthenticated = tmpAuth.isStaffAuthenticated;
      this.token = tmpAuth.token;
      this.userId = tmpAuth.userId;
    }

    // else do nothing? or initialize to empty/false?

    this.dataInitialized = true; // this will help ensure we don't keep reading from localStorage
  }

  getUser(_id: string) {
    // TODO
  }

  // getTokenDeprecated() {
  //   if (this.token) {
  //     return this.token;
  //   } else {
  //     this.refreshAuthDataDeprecated();
  //     return this.token;
  //   }
  // }

  // getIsAdminAuthDeprecated() {
  //   if (this.isAdminAuthenticated) {
  //     return true;
  //   } else {
  //     this.refreshAuthDataDeprecated();
  //     return this.isAdminAuthenticated;
  //   }

  // }

  // getIsStaffAuthDeprecated() {
  //   if (this.isStaffAuthenticated) {
  //     return true;
  //   } else {
  //     this.refreshAuthDataDeprecated();
  //     return this.isStaffAuthenticated;
  //   }
  // }



  // getUserIdDeprecated() {
  //   if (this.userId) {
  //     return this.userId;
  //   } else {
  //     this.refreshAuthDataDeprecated();
  //     return this.userId;
  //   }
  // }
}

