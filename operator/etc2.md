## startWith/endwith

> 맨 앞/뒤에 n개의 요소 추가

```javascript
const { of } = rxjs;
const { startWith } = rxjs.operators;

const obs$ = of(1, 2, 3);

obs$.pipe(startWith(0)).subscribe(console.log);
// obs$.pipe(startWith(-2, -1, 0)).subscribe(console.log)
```

## every

> 모든 발행물들이 주어진 조건에 부합하는가 여부
>
> 자바스크립트 Array.prototype.every 와 유사

## defaultIfEmpty

> 발행물이 없을 시 기본값 발행

```javascript
const { fromEvent, timer } = rxjs;
const { defaultIfEmpty, pluck, takeUntil } = rxjs.operators;

fromEvent(document, "click")
  .pipe(takeUntil(timer(5000)), pluck("x"), defaultIfEmpty("NO CLICK"))
  .subscribe(console.log);
```

## retry

> 발행 실패시 N회 재시도

```javascript
const { range } = rxjs;
const { ajax } = rxjs.ajax;
const { mergeMap, pluck, retry } = rxjs.operators;

range(1, 20)
  .pipe(
    mergeMap((keyword) =>
      ajax(`http://127.0.0.1:3000/people/quarter-error/${keyword}`).pipe(
        pluck("response", "first_name"),
        retry(3)
      )
    )
  )
  .subscribe(console.log);
```

## defer

> 구독하는 순간에 조건에 따른 스트림을 생성
>
> **옵저버블이 해당 코드가 실행되는 부분(시점)에서 생성**되기 때문에 당시의 상태에 따라 만들어질 옵저버블이 결정되도록 할 수 있다.

```javascript
const { defer, fromEvent, of } = rxjs;
const { pluck } = rxjs.operators;

fromEvent(document.querySelector("#check"), "change")
  .pipe(pluck("target", "checked"))
  .subscribe((checked) => {
    defer((_) => (checked ? of("CHECKED") : of("UNCHECKED"))).subscribe(
      console.log
    );
  });
```

-> 해당하는 상황(시점)에서 판단

## iif

> 단순화된 defer (조건에 따라 두 스트림 중 하나 발행)
>
> false 시의 스트림이 주어지지 않으면 false시 바로 complete

```javascript
const { iif, fromEvent, of } = rxjs;
const { pluck } = rxjs.operators;

fromEvent(document.querySelector("#check"), "change")
  .pipe(pluck("target", "checked"))
  .subscribe((checked) => {
    iif((_) => checked, of("CHECKED"), of("UNCHECKED")).subscribe(
      console.log,
      (err) => console.log(err),
      (_) => console.log("COMPLETE")
    );
  });
```

-> defer를 문법적으로 단순화 한 것

-> 3개의 인자
(condition : ()=> boolean, trueReseult : ObservableInput, falseResult : ObservableInput)

## empty

> 어떤 조건에 따라서 스트림 형식을 일을 처리할 때 값을 발행하지 않아야할 때 사용된다.

## throwError

> error 발생

## share

> 스트림을 여러 구독자들간 공유, 스트림의 sideeffect(tap 등)이 한 번만 발생
>
> observable을 subject 처럼 만들어준다. (multi cast)

```javascript
const { interval } = rxjs;
const { take, tap, takeLast, share } = rxjs.operators;

const obs$ = interval(1000).pipe(
  take(20),
  tap((x) => console.log(`side effect: ${x}`)),
  share()
);

obs$.subscribe((x) => console.log(`subscriber 1: ${x}`));

setTimeout((_) => {
  obs$.subscribe((x) => console.log(`subscriber 2: ${x}`));
}, 5000);
setTimeout((_) => {
  obs$.subscribe((x) => console.log(`subscriber 3: ${x}`));
}, 10000);
```

위의 코드에서 share()가 없다면
두번째 console(subscriber 2 : x)의 x는 0부터 시작하지만 share가 있으므로 5부터 시작한다.
-> observable을 subject처럼 multicast처럼 만들어주는 것이 share이다.

## shareReplay

> share 된 스트림의 마지막 N개 발행물을 새 구독자에게 발행

```javascript
const { interval } = rxjs;
const { take, tap, takeLast, shareReplay } = rxjs.operators;

const obs$ = interval(1000).pipe(
  take(20),
  tap((x) => console.log(`side effect: ${x}`)),
  shareReplay(3)
);

obs$.subscribe((x) => console.log(`subscriber 1: ${x}`));

setTimeout((_) => {
  obs$.subscribe((x) => console.log(`subscriber 2: ${x}`));
}, 5000);
setTimeout((_) => {
  obs$.subscribe((x) => console.log(`subscriber 3: ${x}`));
}, 10000);
```
