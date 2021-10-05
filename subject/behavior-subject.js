//Behavior Subject
//마지막 값을 저장 후 추가 구독자에게 발행

const { BehaviorSubject } = require("rxjs");

const subject = new BehaviorSubject(0); // 초기값이 있음

subject.subscribe((x) => console.log("A: " + x));

subject.next(1);
subject.next(2);
subject.next(3);

subject.subscribe((x) => console.log("B: " + x));

subject.next(4);
subject.next(5);

//output
/*
A: 0
A: 1
A: 2
A: 3
B: 3 (A에서 마지막 값을 저장 후, 가져옴)
A: 4
B: 4
A: 5
B: 5
*/

//getValue를 통해 subject가 마지막으로 발행한 값을 얻을 수 있다.
const lastValue = subject.getValue();
console.log(lastValue); //5
