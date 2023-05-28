# angular-observables

Because observables produce values asynchronously, try/catch will not effectively catch errors. Instead, you handle errors by specifying an error callback on the observer. Producing an error also causes the observable to clean up subscriptions and stop producing values. An observable can either produce values (calling the next callback), or it can complete, calling either the complete or error callback.

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/stackblitz-starters-nireae)