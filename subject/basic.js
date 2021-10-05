const { Subject } = require("rxjs");

const subject = new Subject();

subject.subscribe(console.log);

subject.next(1);
subject.next(3);
subject.next(5);

//모든 subject는 Observer 이자 Observable 이다.
// 값이 발행되는 시점을 특별하게 setting 할때
// 특정 프로그램의 상태를 변수 대신에 저장할 때 사용한다.
