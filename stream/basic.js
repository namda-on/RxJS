const rxjs = require("rxjs");

const { of, from, range, generate } = rxjs;

const obs1$ = of(1, 2, 3, 4, 5); // of는 인들 자가 값으로 출력
const obs2$ = from([6, 7, 8, 9, 10]); //array를 인자로 받아서 출력
const obs3$ = range(11, 5); // (시작숫자, 몇개)
const obs4$ = generate(
  15,
  (x) => x < 30,
  (x) => x + 2
); //javascript for문 15부터 30보다 작을 때 까지, 2씩 더해서 stream

//obs1$.subscribe((item) => console.log(`of: ${item}`));
/*
of: 1
of: 2
of: 3
of: 4
of: 5
*/

// obs2$.subscribe((item) => console.log(`from: ${item}`));
obs3$.subscribe((item) => console.log(`range: ${item}`));
//obs4$.subscribe(item => console.log(`generate: ${item}`))
