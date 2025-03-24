import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent {
  private messagesService = inject(MessagesService);

  // With AsyncPipe
  messages$ = this.messagesService.messages$;

  // messages = this.messagesService.allMessages;

  // Code for manual change detection
  // messages: string[] = [];
  // private cdRef = inject(ChangeDetectorRef);
  // private destroyRef = inject(DestroyRef);

  // ngOnInit() {
  //   const subscription = this.messagesService.messages$.subscribe(
  //     (messages) => {
  //       this.messages = messages;
  //       this.cdRef.markForCheck();
  //     }
  //   );
  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });
  // }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
