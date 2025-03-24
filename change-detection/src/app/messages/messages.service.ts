import { Injectable, signal } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  // Without signals
  // messages$ = new BehaviorSubject<string[]>([]);
  // private messages: string[] = [];

  // get allMessages() {
  //   return [...this.messages];
  // }

  // addMessage(message: string) {
  //   this.messages = [...this.messages, message];
  //   this.messages$.next(this.messages);
  // }

  // Signal-based service
  private messages = signal<string[]>([]);
  allMessages = this.messages.asReadonly();

  addMessage(message: string) {
    this.messages.update((prevMessages) => [...prevMessages, message]);
  }
}
