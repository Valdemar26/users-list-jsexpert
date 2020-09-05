import { Component, OnInit } from '@angular/core';

import { UsersService } from '../users.service';
import { UserInterface } from '../interfaces/user.interface';
import {MatListOption} from "@angular/material/list";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: UserInterface[];
  username: string;
  name: string;
  role: string;
  private selectedList: UserInterface[];

  constructor(public usersService: UsersService) { }

  public ngOnInit(): void {
    this.getUsersList();
  }

  public deleteUsers(): void {
    this.usersService.deleteUsers(this.selectedList);
    this.users = this.usersService.getUsersList();
  }

  public selectItem(users: MatListOption[]): void {
    this.selectedList = [];
    users.forEach((element) => {
      this.selectedList.push(element.value);
    });
  }

  public search(query: string): void {
    this.users = this.usersService.findUser(query);
  }

  public sort(direction: string): void {
    this.users = this.usersService.sortUsers(direction);
  }

  public addUser(): void {
    this.usersService.addUser({
      id: Math.floor((Math.random() * 6) + 10),
      name: this.name,
      username: this.username,
      email: '',
      role: this.role,
      phone: '',
      website: ''
    });

    this.users = this.usersService.getUsersList();
    this.clearInputs();
  }

  private getUsersList(): void {
    this.users = this.usersService.getUsersList();
  }

  private clearInputs(): void {
    this.username = '';
    this.name = '';
    this.role = '';
  }

}
