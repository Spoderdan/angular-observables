import 'zone.js/dist/zone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import {
  filter,
  firstValueFrom,
  from,
  lastValueFrom,
  map,
  Observable,
  of,
  retry,
  Subject,
} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Hello from {{name}}!</h1>
    <a target="_blank" href="https://angular.io/start">
      Learn more about Angular 
    </a>
  `,
})
export class App implements OnInit {
  name = 'Angular';

  ngOnInit(): void {
    this.observableDemo();
    // this.coldObservableDemo();
    // this.hotObservableDemo();
    // this.subjectDemo();
  }

  async observableDemo() {
    // Cold observable - closes itself
    const observable = new Observable((subscriber) => {
      // subscriber.error('My error');
      subscriber.next(1);
      subscriber.next(2);
      // subscriber.error('My error');
      subscriber.next(3);
      subscriber.add(() => {
        console.log('add');
      });
      setTimeout(() => {
        subscriber.next(4);
        //subscriber.complete();
      }, 1000);
    });

    console.log('just before subscribe');
    const subscription = observable.subscribe({
      next(x) {
        console.log('got value ' + x);
      },
      error(err) {
        console.error('something wrong occurred: ' + err);
      },
      complete() {
        console.log('done');
      },
    });
    console.log('just after subscribe');

    // Unsubscribe after 500ms
    setTimeout(() => subscription.unsubscribe(), 500);

    // Executes after complete
    // await lastValueFrom(observable).then((value) => console.log(value));

    // Executes after next
    await firstValueFrom(observable).then((value) => console.log(value));
    console.log('after firstValueFrom');
  }

  coldObservableDemo() {
    const observable = new Observable((observer) => {
      observer.next(Math.random());
    });

    // subscription 1
    observable.subscribe((data) => {
      console.log(data); // 0.24957144215097515 (random number)
    });

    // subscription 2
    observable.subscribe((data) => {
      console.log(data); // 0.004617340049055896 (random number)
    });
  }

  hotObservableDemo() {
    const random = Math.random();

    const observable = new Observable((observer) => {
      observer.next(random);
    });

    // subscription 1
    observable.subscribe((data) => {
      console.log(data); // 0.11208711666917925 (random number)
    });

    // subscription 2
    observable.subscribe((data) => {
      console.log(data); // 0.11208711666917925 (random number)
    });
  }

  subjectDemo() {
    // Subjects are both Observables and Observers
    const subject = new Subject();
    const observable = subject.asObservable();
    const observer = subject;

    // Observable behaviour
    observable.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('complete'),
    });

    // Observer behaviour
    observer.next('sub');
    observer.complete();
    observer.next('sub');
    observer.next('sub');
  }
}

bootstrapApplication(App);
