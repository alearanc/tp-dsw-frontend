import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-avatar',
  template: `
    <div class="avatar" (click)="onClick.emit($event)">
      {{ initials }}
    </div>
  `,
  styles: [`
    .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: gray;
      color: white;
      font-size: 1.2em;
      margin-left: 10px;
      cursor: pointer;
    }
  `]
})
export class AvatarComponent {
  @Input() initials: string = '';
  @Output() onClick = new EventEmitter<Event>();
}