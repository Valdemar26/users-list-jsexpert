import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() config;
  @Output() output = new EventEmitter();
  @Output() close = new EventEmitter();

  constructor() { }

  public ngOnInit(): void {
    console.log('config: ', this.config);
  }

  public closeNotification(): void {
    this.close.emit();
  }
}
