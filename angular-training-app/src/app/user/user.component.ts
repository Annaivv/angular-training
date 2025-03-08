import { Component, EventEmitter, Input, Output } from '@angular/core';
import { type User } from './user.model';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  @Input({ required: true }) user!: User;
  @Input({ required: true }) selected!: boolean;
  @Output() select = new EventEmitter<string>();

  // avatar = input.required<string>(); // readonly
  // name = input.required<string>(); // readonly
  // select = output<string>(); // creates the event emitter, replaces the decorators

  // imagePath = computed(() => 'assets/users/' + this.avatar());

  get imagePath() {
    return 'assets/users/' + this.user.avatar;
  }

  onSelectUser() {
    this.select.emit(this.user.id);
  }
}

// Non-configurable UserComponent
// import { Component, computed, signal } from '@angular/core';

// import { DUMMY_USERS } from '../dummy-users';

// const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

// @Component({
//   selector: 'app-user',
//   standalone: true,
//   imports: [],
//   templateUrl: './user.component.html',
//   styleUrl: './user.component.css',
// })
// export class UserComponent {
//   selectedUser = signal(DUMMY_USERS[randomIndex]);
//   imagePath = computed(() => 'assets/users/' + this.selectedUser().avatar);

//   // get imagePath() {
//   //   return '../../assets/users/' + this.selectedUser.avatar;
//   // }

//   onSelectUser() {
//     const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
//     this.selectedUser.set(DUMMY_USERS[randomIndex]);
//   }
// }
