import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  // Transfroming the signal to an observable (alternative)
  clickCount$ = toObservable(this.clickCount);
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
