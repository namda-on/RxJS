const { from } = require("rxjs");
const observable$ = from([1, 2, 3, 4, 5]); //구독자 만들기
//observable은 변수 접미사로 $를 붙여주는게 convetion

//구독자 생성함수
const observer = {
  next: console.log, // stream에서 들어오는 값들을 처리하는 함수
  error: (err) => console.error("발행중 오류", err),
  complete: () => console.log("발행물 완결"),
};

observable$.subscribe(observer);

//observer의 next, error, complete은 부분적으로 지정이 가능하다.
const observer_1 = {
  next: console.log,
  error: (err) => console.error("발행중 오류", err),
};

const observer_2 = {
  next: console.log,
};

//객체를 생성하지 않고, 순서대로  parameter로 전달해주는 것도 가능하다.
observable$.subscribe(
  console.log,
  (err) => console.error("발행중 오류", err),
  (_) => console.log("발행물 완결")
);
