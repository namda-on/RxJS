//Replay Subject
//마지막 n개 값을 저장 후 추가 구독자에게 발행

const { ReplaySubject } = require("rxjs");
const subject = new ReplaySubject(3); // 마지막 3개 값 저장

subject.subscribe((x) => console.log("A: " + x));

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);
subject.next(5);

subject.subscribe((x) => console.log("B: " + x));

//3,4,5 발행후
subject.next(6);
subject.next(7);

//output
/*
A: 1
A: 2
A: 3
A: 4
A: 5
B: 3
B: 4
B: 5
A: 6
B: 6
A: 7
B: 7
*/
