const { from } = require("rxjs");
const {
  max,
  count,
  elementAt,
  filter,
  reduce,
  distinct,
} = require("rxjs/operators");

const obs$ = from([
  9, 3, 10, 5, 1, 10, 9, 9, 1, 4, 1, 8, 6, 2, 7, 2, 5, 5, 10, 2,
]);

//짝수들 중에서 가장 큰 수
obs$
  .pipe(
    filter((val) => val % 2 === 0),
    max()
  )
  .subscribe((a) => console.log(a));

//5보다 큰 3번째 짝수
obs$
  .pipe(
    filter((val) => val % 2 === 0 && val > 5),
    elementAt(2)
  )
  .subscribe((a) => console.log(a));

//한 번 이상 나온 홀수들의 갯수, 합
obs$
  .pipe(
    distinct(),
    filter((val) => val % 2 === 1),
    count()
  )
  .subscribe((x) => console.log(x));

obs$
  .pipe(
    distinct(),
    filter((val) => val % 2 === 1),
    reduce((acc, cur) => acc + cur, 0)
  )
  .subscribe((x) => console.log(x));
