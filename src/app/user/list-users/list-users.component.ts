import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthData } from '../../auth/auth-data.model';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users: AuthData[];

  userListSub: Subscription;

  // only admins can see the isAdmin column
  isAdminAuth: boolean;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {

    this.isAdminAuth = this.authService.getIsAdminAuth();

    this.userListSub = this.userService.getUserListUpdated().subscribe(res => {
      this.users = res;
    });

    this.userService.listUsers();
  }

}
