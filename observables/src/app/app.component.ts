import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  // Transfroming the signal to an observable (alternative)
  clickCount$ = toObservable(this.clickCount);
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: 0 });
  customInterval$ = new Observable((subscriber) => {
    let timesExecuted = 0;
    const interval = setInterval(() => {
      if (timesExecuted > 3) {
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log('Emitting new value...');
      subscriber.next({ message: 'New value' });
      timesExecuted++;
    }, 2000);
  });
  private destroyref = inject(DestroyRef);

  constructor() {
    // effect(() => {
    //   console.log(`Clicked the button ${this.clickCount()} times`);
    // });
    // Transfroming the signal to an observable
    // toObservable(this.clickCount);
  }

  ngOnInit(): void {
    // const subscription = interval(1000)
    //   .pipe(map((val) => val * 2))
    //   .subscribe({
    //     next: (val) => console.log(val),
    //   });

    // this.destroyref.onDestroy(() => {
    //   subscription.unsubscribe();
    // });
    this.customInterval$.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('COMPLETED'),
    });
    const subscription = this.clickCount$.subscribe({
      next: (val) =>
        console.log(`Clicked the button ${this.clickCount()} times`),
    });
    this.destroyref.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onClick() {
    this.clickCount.update((prevCount) => prevCount + 1);
  }
}
