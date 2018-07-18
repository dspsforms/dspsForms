import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "../auth/auth-data.model";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userList: AuthData[];

  private userListUpdated = new Subject<AuthData[]>();

  constructor(private http: HttpClient, private router: Router) { }

  // retrieve list of users
  listUsers() {

    const url = environment.server + '/api/user/list' ;
    this.http.get<{ message: string, users: AuthData[] }>(url)
      .subscribe(res => {
        console.log("listUsers()", res);

        this.userList = res.users;
        this.userListUpdated.next([...this.userList]);

      },
      err => {
        console.log("err", err);
    });
  }

  getUserListUpdated() {
    return this.userListUpdated.asObservable();
  }

}
