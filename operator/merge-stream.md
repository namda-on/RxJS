# 스트림 결합 연산자

## merge

> 두 개의 스트림을 순서 관계없이 병합

ex1)

```javascript
const { merge, interval, fromEvent } = rxjs;
const { map } = rxjs.operators;

const interval$ = interval(1000).pipe(map((_) => "interval")); //1초에 한번 "interval"이 발행
const click$ = fromEvent(document, "click").pipe(map((_) => "click")); //click을 할때마다 "click"이 발행

merge(interval$, click$).subscribe(console.log); //console.log에 두 개의 스트림에서 발행한 것들이 모두 전달됨
```

ex2)

```javascript
const { merge, interval } = rxjs;
const { map, take } = rxjs.operators;

const intv1$ = interval(1000).pipe(
  map((_) => "INTERVAL 1"),
  take(5)
);
const intv2$ = interval(1000).pipe(
  map((_) => "INTERVAL 2"),
  take(10)
);
const intv3$ = interval(1000).pipe(
  map((_) => "INTERVAL 3"),
  take(15)
);
const intv4$ = interval(1000).pipe(
  map((_) => "INTERVAL 4"),
  take(15)
);
const intv5$ = interval(1000).pipe(
  map((_) => "INTERVAL 5"),
  take(15)
);

//마지막 parameter에 숫자를 넘겨주면
merge(intv1$, intv2$, intv3$, intv4$, intv5$, 3).subscribe(console.log); //deprecated
```

![image](https://user-images.githubusercontent.com/60877502/136515017-1be767df-045d-4c37-9258-0fb2f4e31b8e.png)

merge의 마지막 parameter에 1을 주면 이어붙이는 결과와 동일 -> concat과 같다.

## concat

> 두 개의 스트림을 순서대로 이어짐

```javascript
const { concat, interval, fromEvent } = rxjs;
const { map, take } = rxjs.operators;

const interval$ = interval(1000).pipe(
  map((_) => "interval"),
  take(5)
);
const click$ = fromEvent(document, "click").pipe(map((_) => "click"));

concat(interval$, click$).subscribe(console.log);
```

-> 예상 : interval 5개 사이에 click한 값들은 5개 이후에 나올 것이라 예상
-> 결과 : interval이 발행되는 동안 click된 값들은 발행되지 않음

이유 : observable은 특정 observer가 subscribe를 한 시점부터 값을 발행한다.
concat은 첫 번째 stream이 complete된 이후에 두 번째, stream을 구독한다.

## mergeAll

![img](https://rxjs-dev.firebaseapp.com/assets/images/marble-diagrams/mergeAll.png)

-> 특정 상위 stream에서 map으로 또다른 stream을 계속 만들 때, 이를 병합해서 하나의 stream으로 반환하는게 mergeAll
-> mergeMap으로 단순화해서 사용이 가능하다.

## mergeMap

```javascript
const { interval, fromEvent } = rxjs;
const { mergeMap, map, take } = rxjs.operators;

fromEvent(document, "click")
  .pipe(
    mergeMap((e) =>
      interval(1000).pipe(
        map((i) => e.x + " : " + i),
        take(5)
      )
    )
  )
  .subscribe(console.log);
```

```javascript
const { of } = rxjs;
const { ajax } = rxjs.ajax;
const { mergeMap, pluck } = rxjs.operators;

of(3, 15, 4, 9, 1, 7)
  .pipe(
    mergeMap((keyword) =>
      ajax(`http://127.0.0.1:3000/people/${keyword}`).pipe(
        pluck("response", "first_name")
      )
    )
  )
  .subscribe(console.log);
```

-> ajax 응답이 오는 순서대로 merge가 되서 반환된다.
-> merge와 마찬가지로 두 번째 인자로 몇 개의 스트림을 동시 진행할 것인지 설정할 수 있다.

## concatAll

![img](https://rxjs-dev.firebaseapp.com/assets/images/marble-diagrams/concatAll.svg)

-> 하나의 스트림이 끝난 이후에 다른 스트림의 결과들을 합친다.
-> concatMap을 이용해 쉽게 사용할 수 있다.

## concatMap

```javascript
const { interval, fromEvent } = rxjs;
const { concatMap, map, take } = rxjs.operators;

fromEvent(document, "click")
  .pipe(
    concatMap((e) =>
      interval(1000).pipe(
        map((i) => e.x + " : " + i),
        take(5)
      )
    )
  )
  .subscribe(console.log);
```

```javascript
const { of } = rxjs;
const { ajax } = rxjs.ajax;
const { concatMap, pluck } = rxjs.operators;

of(3, 15, 4, 9, 1, 7)
  .pipe(
    concatMap((keyword) =>
      ajax(`http://127.0.0.1:3000/people/${keyword}`).pipe(
        pluck("response", "first_name")
      )
    )
  )
  .subscribe(console.log);
```

-> mergeMap과 다르게 concatMap은 ajax요청들ㄹ을 보내면 늘 동일한 순서로 이름들이 반한된다.

## switchMap

> 기준 스트림이 새 값을 발행하면 진행중이던 스트림을 멈춤

```javascript
const { interval, fromEvent } = rxjs;
const { switchMap, map, take } = rxjs.operators;

fromEvent(document, "click")
  .pipe(
    switchMap((e) =>
      interval(1000).pipe(
        map((i) => e.x + " : " + i),
        take(5)
      )
    )
  )
  .subscribe(console.log);
```

![img](https://rxjs-dev.firebaseapp.com/assets/images/marble-diagrams/switchMap.png)

-> ajax 요청을 보낼 때 이전 것을 자동으로 취소하고 보낼 때 유용하게 쓸 수 있다.

## ~MapTo 연산자들

> 값은 두번째 스트림에서만 발행

- mergeMapTo
- concatMapTo
- switchMapTo
