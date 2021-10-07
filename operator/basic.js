const { of, from } = require("rxjs");
const {
  count,
  max,
  min,
  reduce,
  first,
  last,
  elementAt,
  distinct,
  tap,
  filter,
} = require("rxjs/operators");

const obs$ = of(4, 2, 6, 10, 8);

obs$.pipe(count()).subscribe((x) => console.log("count: " + x));
obs$.pipe(max()).subscribe((x) => console.log("max: " + x));
obs$.pipe(min()).subscribe((x) => console.log("min: " + x));

obs$
  .pipe(
    reduce((acc, x) => {
      return acc + x;
    }, 0) //javascript reduce와 유사하다.
  )
  .subscribe((x) => console.log("reduce: " + x));

const obs2$ = from([
  9, 3, 10, 5, 1, 10, 9, 9, 1, 4, 1, 8, 6, 2, 7, 2, 5, 5, 10, 2,
]);

obs2$.pipe(first()).subscribe((x) => console.log("first: " + x));
//first : 9

obs2$.pipe(last()).subscribe((x) => console.log("last: " + x));
//last : 2

obs2$.pipe(elementAt(5)).subscribe((x) => console.log("elementAt: " + x));
// 배열에서 몇번 째 것(index)을 사용할지 -> elementAt : 10

obs2$.pipe(distinct()).subscribe((x) => console.log("distinct: " + x));
// 중복되는 요소들을 제거하고 처음 한번만 사용(set 처럼 작동하게)

obs2$.pipe(distinct(), count()).subscribe((x) => console.log("count: " + x));
// count : 10

// tab : 발행 결과에 영향을 주지 않음
// debugging 또는 console을 subscribe 하지 않고 tab으로 끝낸다.
from([9, 3, 10, 5, 1, 10, 9, 9, 1, 4, 1, 8, 6, 2, 7, 2, 5, 5, 10, 2])
  .pipe(
    tap((x) => console.log("-------------- 처음 탭: " + x)),
    filter((x) => x % 2 === 0),
    tap((x) => console.log("--------- 필터 후: " + x)),
    distinct(),
    tap((x) => console.log("중복 제거 후: " + x))
  )
  .subscribe((x) => console.log("발행물: " + x));
