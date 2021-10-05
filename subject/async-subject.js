//Async Subject
//Complete 후의 마지막 값만 발행

const { AsyncSubject } = require("rxjs");

const subject = new AsyncSubject();

subject.subscribe((x) => console.log("A: " + x));

subject.next(1);
subject.next(2);
subject.next(3);

subject.subscribe((x) => console.log("B: " + x));

subject.next(4);
subject.next(5);

subject.subscribe((x) => console.log("C: " + x));

subject.next(6);
subject.next(7);
subject.complete(); //7을 발행

//output
/*
A: 7 
B: 7
C: 7
*/

//-> 언제 구독을 시작했는지와 관계없이 중간의 값을 pass하고, complete가 되었을 때 마지막 값 만을 실행한다.
