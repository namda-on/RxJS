# time이 붙은 연산자들

## base code

```javascript
const { fromEvent } = rxjs;
const { timeInterval, pluck, scan, tap } = rxjs.operators;

const clicks$ = fromEvent(document, "click").pipe(
  timeInterval(),
  pluck("interval"),
  scan((acc, i) => acc + i, 0),
  tap((x) => console.log("CLICKED: " + x))
);

clicks$.subscribe();
```

## debounceTime

```javascript
const { debounceTime } = rxjs.operators;

clicks$
  .pipe(debounceTime(1000))
  .subscribe((x) => console.log("OUTPUT: -------- " + x));
```

![img](https://www.yalco.kr/images/lectures/rxjs/2-5/debouncetime.png)

우리가 일반적으로 이해하는 debounce

## auditTime

```javascript
const { auditTime } = rxjs.operators;

clicks$
  .pipe(auditTime(1000))
  .subscribe((x) => console.log("OUTPUT: -------- " + x));
```

![img](https://www.yalco.kr/images/lectures/rxjs/2-5/audittime.png)

**특정값이 발행되고 나서, t초가 지나면 그 특정값 또는 t초가 지나기 전에 생성된 마지막 값이 발행된다.**
(어떤 값이 발행되고 나서 일정 시간이 지나고나서 무조건 하나는 발행된다.)

## sampleTime

```javascript
const { sampleTime } = rxjs.operators;

clicks$
  .pipe(sampleTime(1000), timeInterval())
  .subscribe((x) =>
    console.log("OUTPUT: -------- " + x.value + " :" + x.interval)
  );
```

![img](https://www.yalco.kr/images/lectures/rxjs/2-5/sampletime.png)

-> t초 간격으로 interval이 존재하고(그림에서 세로선) 해당 interval에서만 값이 발행된다.
(interval 내에 발생한 값들 중 마지막 값)

## ThrottleTime(1000, {leading : true, trailing : false} )

### default (leading : true, trailing : false)

```javascript
const { throttleTime } = rxjs.operators;

clicks$
  .pipe(
    throttleTime(1000, undefined, {
      leading: true,
      trailing: false,
    }) // 2번째 인자는 schedular 옵션
  )
  .subscribe((x) => console.log("OUTPUT: -------- " + x));
```

![img](https://www.yalco.kr/images/lectures/rxjs/2-5/throttletime-leading.png)

-> 우리가 일반적으로 생각하는 throttle (특정 stream이 발생하고 일정시간동안 발생하는 stream은 무시)
-> stream이 발생하고 바로 전달

### trailing: true

![img](https://www.yalco.kr/images/lectures/rxjs/2-5/throttletime-trailing.png)

-> 특정 값이 발행하고 해당 간격동안 발생한 것 중 마지막 것 발행
-> auditTime과의 차이는 마지막 시점에 conflict(stream 자체가 종료되었으나 아직 delay에 의해 발행되지않은 값이 있을 때)가 날때 발행 여부의 차이(throttleTime은 발행함)

### leading :true && trailing : ture

-> 위의 값들 둘다 나온다.

# ~Time이 붙지 않은 연산자들

## debounce

예제 1)

```javascript
const { fromEvent, interval } = rxjs;
const { debounce, audit, pluck } = rxjs.operators;

fromEvent(document, "click")
  .pipe(
    pluck("y"),
    debounce((y) => interval(y * 10)) //debounce 값을 유동적으로 제어할 수 있다.
  )
  .subscribe(console.log);
```

예제 2)

```javascript
const { BehaviorSubject, fromEvent, interval } = rxjs;
const { debounce, tap } = rxjs.operators;

const bs = new BehaviorSubject(1000);

fromEvent(document, "click")
  .pipe(
    tap((_) => console.log(bs.getValue())), //맨처음에 1000
    debounce((e) => interval(bs.getValue())),
    tap((_) => bs.next(bs.getValue() + 500)) //현재값에 500넣어서 next로
  )
  .subscribe((_) => console.log("CLICK"));
```

**BehaviorSubject**

> A variant of Subject that requires an initial value and emits its current value whenever it is subscribed to.

behavior Subject를 상태값으로 사용해서 유동적인 debounce

## sample

```javascript
const { fromEvent, interval } = rxjs;
const { sample } = rxjs.operators;

interval(1000)
  .pipe(sample(fromEvent(document, "click")))
  .subscribe(console.log);
```

![img](https://rxjs-dev.firebaseapp.com/assets/images/marble-diagrams/sample.png)

-> 2번째 stream(위에서는 click)이 발행된 시점에서 1번째 stream 가장 마지막 값을 가져온다

### 출처

> https://www.yalco.kr/@rxjs/2-5/
