/* observable과 observer가 1대1로 대응된다면 observable을 complete하면 되지만
observable을 여러 observer가 구독하고 있을 때는 ,unsubscribe를 통해 구독을 중지한다. */

const { interval } = require("rxjs");

const obs$ = interval(1000);
const subscription = obs$.subscribe(console.log);

setTimeout((_) => subscription.unsubscribe(), 5500);
