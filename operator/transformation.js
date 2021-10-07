const rxjs = require("rxjs");

const { from, of, map, pluck } = rxjs;

of(1, 2, 3, 4, 5)
  .pipe(map((x) => x * x))
  .subscribe(console.log);

const obs$ = from([
  { name: "apple", price: 1200, info: { category: "fruit" } },
  { name: "carrot", price: 800, info: { category: "vegetable" } },
  { name: "pork", price: 5000, info: { category: "meet" } },
  { name: "milk", price: 2400, info: { category: "drink" } },
]);

obs$.pipe(map((item) => item.price)).subscribe(console.log);

//위에서 처럼 객체에서 특정 값만을 뽑아낼때는 pluck operator를 사용하는게 좋다
console.log("--pluck--");
obs$.pipe(pluck("price")).subscribe(console.log);

//객체안의 객체를 뽑아낼 때 유용하다.
obs$.pipe(pluck("info"), pluck("category")).subscribe(console.log);
obs$.pipe(pluck("info", "category")).subscribe(console.log); //이렇게 작성할수도있다.

const { range, toArray, filter } = rxjs;

range(1, 50)
  .pipe(
    filter((x) => x % 3 === 0),
    filter((x) => x % 2 === 1),
    toArray() // 모든 값들이 다 나오기를 기다렸다가 배열로 묶어서 전달
  )
  .subscribe(console.log);

const { reduce, scan } = rxjs;

const obs2$ = of(1, 2, 3, 4, 5);

//reduce : 결과만 발행
obs2$
  .pipe(
    reduce((acc, x) => {
      return acc + x;
    }, 0)
  )
  .subscribe((x) => console.log("reduce: " + x));
//reduce : 15

//scan : 과정을 발행 (많은 응용이 가능하다)
obs2$
  .pipe(
    scan((acc, x) => {
      return acc + x;
    }, 0)
  )
  .subscribe((x) => console.log("scan: " + x));
/*
scan: 1
scan: 3
scan: 6
scan: 10
scan: 15
*/

//zip  => observable을 만들어내는 operator이다.

const { zip } = rxjs;

const obs_1$ = from([1, 2, 3, 4, 5]);
const obs_2$ = from(["a", "b", "c", "d", "e"]);
const obs_3$ = from([true, false, "F", [6, 7, 8], { name: "zip" }]);

zip(obs_1$, obs_2$, obs_3$).subscribe(console.log);
/*
[ 1, 'a', true ]
[ 2, 'b', false ]
[ 3, 'c', 'F' ]
[ 4, 'd', [ 6, 7, 8 ] ]
[ 5, 'e', { name: 'zip' } ]
*/

//개수가 다르면? -> zip 되는 stream들 중 최소 개수에 맞춰어서 출력된다.

//node에서 동작하지 않는 코드
const obs4$ = interval(1000);
const obs5$ = fromEvent(document, "click").pipe(pluck("x"));

zip(obs4$, obs5$).subscribe(console.log);

//-> click event가 interval을 초과하면 interval개수에 맞추어 발행된다.
