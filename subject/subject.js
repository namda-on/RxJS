const { Subject } = require("rxjs");

const subject = new Subject();

setTimeout((_) => {
  let x = 0;
  setInterval((_) => {
    subject.next(x++);
  }, 2000);
}, 5000);

subject.subscribe((x) => console.log("바로구독: " + x));
setTimeout((_) => {
  subject.subscribe((x) => console.log("3초 후 구독: " + x));
}, 3000);
setTimeout((_) => {
  subject.subscribe((x) => console.log("10초 후 구독: " + x));
}, 10000);
setTimeout((_) => {
  subject.subscribe((x) => console.log("14초 후 구독: " + x));
}, 14000);

//모든 구독자가 같은 값을 출력한다.
/*
로구독: 0
3초 후 구독: 0
바로구독: 1
3초 후 구독: 1
바로구독: 2
3초 후 구독: 2
10초 후 구독: 2
바로구독: 3
3초 후 구독: 3
10초 후 구독: 3
바로구독: 4
3초 후 구독: 4
10초 후 구독: 4
14초 후 구독: 4
바로구독: 5
3초 후 구독: 5
10초 후 구독: 5
14초 후 구독: 5
*/
