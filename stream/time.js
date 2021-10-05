const rxjs = require("rxjs");
const { interval, timer } = rxjs;

const obs1$ = interval(1000); //parameter 간격으로 stream 0부터 생성
const obs2$ = timer(3000); //parameter 시간 이후에 stream 생성

obs1$.subscribe((item) => console.log(`interval: ${item}`));
//obs2$.subscribe(item => console.log(`timer: ${item}`))
