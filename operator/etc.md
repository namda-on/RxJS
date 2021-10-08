## sequenceEqual Operator

> 타이밍에 관계없이, 두 스트림 발행물들이 순서의 값 동일 여부 반환

```javascript
const { from, fromEvent } = rxjs;
const { sequenceEqual, mergeMap, map, take } = rxjs.operators;

const num$ = from([3, 1, 4, 7, 5, 8, 2]);

const key$ = fromEvent(document, "keyup")
  .pipe(
    map((e) => Number(e.code.replace("Digit", ""))),
    take(7),
    sequenceEqual(num$)
  )
  .subscribe(console.log);
```

-> input이 같은지 검사(3147582를 치면 true 반환)

## distinctUntilChanged Operator

-> 같은 값이 연속되는 것만 제외 (distinct는 연속에 관계없이 같은 값을 모두 제외 )

ex 1)

```javascript
const { of } = rxjs;
const { distinctUntilChanged } = rxjs.operators;

of(1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 3, 4, 4, 1)
  .pipe(distinctUntilChanged())
  .subscribe(console.log);
```

result

```
1
2
1
2
3
4
1
```

ex2)

```javascript
const { from } = rxjs;
const { distinctUntilChanged } = rxjs.operators;

const students = [
  { name: "홍길동", sex: "male" },
  { name: "전우치", sex: "male" },
  { name: "아라치", sex: "female" },
  { name: "성춘향", sex: "female" },
  { name: "임꺽정", sex: "male" },
];
from(students)
  .pipe(distinctUntilChanged((a, b) => a.sex === b.sex)) // 어떤식으로 비교할지
  .subscribe(console.log);
```

## combineLatest Operator

> 두 스트림을 각 최신 값들끼리 결합

![img](https://rxjs-dev.firebaseapp.com/assets/images/marble-diagrams/combineLatest.png)

```javascript
const { combineLatest, interval, fromEvent } = rxjs;
const { pluck } = rxjs.operators;

combineLatest(
  interval(2000),
  fromEvent(document, "click").pipe(pluck("x"))
).subscribe(console.log);
```

-> zip은 값의 쌍이 순서 대로 결합된다.

## buffer Operator

> 주어진 stream을 2번째 stream에서 값이 발행될 때마다 끊어서 발행한다.

![img](https://rxjs-dev.firebaseapp.com/assets/images/marble-diagrams/buffer.png)

```javascript
const { interval, fromEvent } = rxjs;
const { buffer } = rxjs.operators;

interval(1000)
  .pipe(buffer(fromEvent(document, "click")))
  .subscribe(console.log);
```

결과 예시

```
[1,2,3]
[]
[4,5]
[6,7,8,9,10,11,12]
```

## buffer Count

> 두 번째 stream에서 발행물이 발생할 때까지의 첫번째 발행물의 개수에 집중

> bufferCount(bufferSize : number, startBufferEvery: number = null)

> 두 번째 인자는 얼마나 건너 뛸지(shift)

![img](https://rxjs-dev.firebaseapp.com/assets/images/marble-diagrams/bufferCount.png)

```javascript
const { range } = rxjs;
const { bufferCount } = rxjs.operators;

range(1, 100).pipe(bufferCount(10, 15)).subscribe(console.log);
```

결과

```
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[16, 17, 18, 19, 20, 21, 22, 23, 24, 25]  -> 15만큼 건너 뜀
[31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
[46, 47, 48, 49, 50, 51, 52, 53, 54, 55]
[61, 62, 63, 64, 65, 66, 67, 68, 69, 70]
[76, 77, 78, 79, 80, 81, 82, 83, 84, 85]
[91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
```

ex2) 클릭 3번중 한 번만 반응하기

```javascript
const { fromEvent } = rxjs;
const { bufferCount } = rxjs.operators;

fromEvent(document, "click")
  .pipe(bufferCount(3))
  .subscribe((_) => console.log("FIRE"));
```

## buffer Time

> 시간 간격으로 끊어줌

```javascript
const { interval } = rxjs;
const { bufferTime } = rxjs.operators;

interval(200).pipe(bufferTime(2000)).subscribe(console.log);
```

-> 2초에 한번씩 끊어서 배열로 반환
결과

```
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
[10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
[20, 21, 22, 23, 24, 25, 26, 27, 28, 29]

```

## groupBy

> 하나의 stream 을 group 조건에 따라 stream을 여러 개로 만든다.

![img](https://rxjs-dev.firebaseapp.com/assets/images/marble-diagrams/groupBy.png)

```javascript
const { range } = rxjs;
const { groupBy, mergeMap, toArray } = rxjs.operators;

range(1, 30)
  .pipe(
    groupBy((x) => x % 3),
    mergeMap((groups$) => groups$.pipe(toArray()))
  )
  .subscribe(console.log);
```

결과

```
[1, 4, 7, 10, 13, 16, 19, 22, 25, 28]
[2, 5, 8, 11, 14, 17, 20, 23, 26, 29]
[3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
```
