import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { MatListOption } from '@angular/material/list';

import { UserInterface } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';
import { NotificationComponent } from '../notification/notification.component';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

  @ViewChild('notify', { read: ViewContainerRef }) container: ViewContainerRef;
  componentRef: ComponentRef<NotificationComponent>;

  users: UserInterface[];
  username: string;
  name: string;
  role: string;
  private selectedList: UserInterface[];

  constructor(
    public usersService: UsersService,
    private resolver: ComponentFactoryResolver
  ) { }

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
    if (!this.name || !this.username || !this.role) {
      return;
    } else {
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

      this.createDynamicNotification();
    }

  }

  public ngOnDestroy(): void {
    this.componentRef.destroy();
  }

  private getUsersList(): void {
    this.users = this.usersService.getUsersList();
  }

  private clearInputs(): void {
    this.username = '';
    this.name = '';
    this.role = '';
  }

  private createDynamicNotification(config?): void {
    this.container.clear();

    const factory: ComponentFactory<NotificationComponent> = this.resolver.resolveComponentFactory(NotificationComponent);

    this.componentRef = this.container.createComponent(factory);

    this.componentRef.instance.config = config;

    this.componentRef.instance.output.subscribe((event) => console.log('output event: ', event));
  }

}
