import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthData } from '../../auth/auth-data.model';
import { UserService } from '../user.service';
import { Subscription } from '../../../../node_modules/rxjs';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users: AuthData[];

  userListSub: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {

    this.userListSub = this.userService.getUserListUpdated().subscribe(res => {
      this.users = res;
    });

    this.userService.listUsers();
  }

}
