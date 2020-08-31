import { Component, OnInit } from '@angular/core';

import { UsersService } from '../users.service';
import { UserInterface } from '../interfaces/user.interface';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: UserInterface[];

  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this.users = this.usersService.getUsersList();
  }

  search(query: string) {
    this.users = this.usersService.findUser(query);
  }

  sort(direction: string) {
    this.users = this.usersService.sortUsers(direction);
  }
}
