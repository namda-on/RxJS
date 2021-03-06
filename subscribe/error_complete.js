const { Observable } = require("rxjs");

//Error
const obs$ = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  null[0]; //error -> error가 일어난 경우, 발행을 중단한다.
  subscriber.next(4);
});

obs$.subscribe(
  console.log,
  (err) => console.error("발행중 오류", err),
  (_) => console.log("발행물 완결")
);

//Complete

const obs2$ = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete(); //완결 이후에는 발행을 중단한다. (더 이상 동작을 하지 않음)
  subscriber.next(4);
});

obs2$.subscribe(
  console.log,
  (err) => console.error("발행중 오류", err),
  (_) => console.log("발행물 완결")
);
