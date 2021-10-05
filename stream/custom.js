const { Observable } = require("rxjs");

//Observable 객체를 통해 custom stream 생성
const obs$ = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);

  // 값을 다 발행한 뒤에는 complete을 실행하여 메모리 해제
  subscriber.complete();
});

obs$.subscribe((item) => console.log(item));
