# angular-observables

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/stackblitz-starters-nireae)

Observables
Observables are lazy in the sense that they only execute values when something subscribes to it.

RXJS METHODS

DETAILS

of(...items)

Returns an Observable instance that synchronously delivers the values provided as arguments.

from(iterable)

Converts its argument to an Observable instance. This method is commonly used to convert an array to an observable.

Because observables produce values asynchronously, try/catch will not effectively catch errors. Instead, you handle errors by specifying an error callback on the observer. Producing an error also causes the observable to clean up subscriptions and stop producing values. An observable can either produce values (calling the next callback), or it can complete, calling either the complete or error callback.

Executing Observables
There are three types of values an Observable Execution can deliver:

“Next” notification: sends a value such as a Number, a String, an Object, etc.

“Error” notification: sends a JavaScript Error or exception.

“Complete” notification: does not send a value.

lastValueFrom
Converts an observable to a promise by subscribing to the observable, waiting for it to complete, and resolving the returned promise with the last value from the observed stream.

WARNING: Only use this with observables you know will complete. If the source observable does not complete, you will end up with a promise that is hung up, and potentially all of the state of an async function hanging out in memory. To avoid this situation, look into adding something like timeout, take, takeWhile, or takeUntil amongst others.

firstValueFrom
Converts an observable to a promise by subscribing to the observable, and returning a promise that will resolve as soon as the first value arrives from the observable. The subscription will then be closed.

WARNING: Only use this with observables you know will emit at least one value, OR complete. If the source observable does not emit one value or complete, you will end up with a promise that is hung up, and potentially all of the state of an async function hanging out in memory. To avoid this situation, look into adding something like timeout, take, takeWhile, or takeUntil amongst others.

Operators
The Operators are functions that operate on an Observable and return a new Observable.

RxJS 


Observable Operators
Hot and Cold Observables
There are two types of observables: hot and cold. The main difference is that a cold observable creates a data producer for each subscriber, whereas a hot observable creates a data producer first, and each subscriber gets the data from one producer, starting from the moment of subscription.

Let’s compare watching a movie on Netflix to going into a movie theater. Think of yourself as an observer. Anyone who decides to watch Mission: Impossible on Netflix will get the entire movie, regardless of when they hit the play button. Netflix creates a new producer to stream a movie just for you. This is a cold observable.

If you go to a movie theater and the showtime is 4 p.m., the producer is created at 4 p.m., and the streaming begins. If some people (subscribers) are late to the show, they miss the beginning of the movie and can only watch it starting from the moment of arrival. This is a hot observable.

A cold observable starts producing data when some code invokes a subscribe() function on it. For example, your app may declare an observable providing a URL on the server to get certain products. The request will be made only when you subscribe to it. If another script makes the same request to the server, it’ll get the same set of data.

A hot observable produces data even if no subscribers are interested in the data. For example, an accelerometer in your smartphone produces data about the position of your device, even if no app subscribes to this data. A server can produce the latest stock prices even if no user is interested in this stock.

Unsubscribing from an Observable
We need to unsubscribe to close the observable when we no longer require it. If not it may lead to memory leak & performance degradation.

But, you do not have to unsubscribe from every subscription. For Example, the observables, which emits the complete signal, close the observable.

Observables Compared to Promises
Observables are often compared to promises. Here are some key differences:

Observables are declarative; computation does not start until subscription. Promises execute immediately on creation. This makes observables useful for defining recipes that can be run whenever you need the result.

Observables provide many values. Promises provide one. This makes observables useful for getting multiple values over time.

Observables differentiate between chaining and subscription. Promises only have .then() clauses. This makes observables useful for creating complex transformation recipes to be used by other part of the system, without causing the work to be executed.

Observables subscribe() is responsible for handling errors. Promises push errors to the child promises. This makes observables useful for centralized and predictable error handling.

Subjects
A Subject is a special type of Observable that allows values to be multicasted to many Observers. Subjects are like EventEmitters.

Every Subject is an Observable and an Observer. You can subscribe to a Subject, and you can call next to feed values as well as error and complete.