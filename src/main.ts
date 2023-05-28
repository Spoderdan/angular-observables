import 'zone.js/dist/zone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { filter, from, map, Observable, of, retry, Subject } from 'rxjs';

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
  }

  observableDemo() {
    const observable = new Observable((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.error('My error');
      subscriber.next(3);
      subscriber.add(() => {
        console.log('add');
      });
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 1000);
    });

    console.log('just before subscribe');
    observable.subscribe({
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
  }

  subjectDemo() {
    const subject = new Subject();
    subject.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('complete'),
    });
    subject.next('sub');
    subject.complete();
    subject.next('sub');
    subject.next('sub');
  }
}

bootstrapApplication(App);
