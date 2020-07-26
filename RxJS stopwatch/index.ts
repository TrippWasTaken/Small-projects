import { fromEvent, interval, merge, noop, NEVER } from 'rxjs';
import { map, mapTo, scan, startWith, switchMap, tap, takeWhile } from 'rxjs/operators';

interface State {
  count: boolean;
  speed: number;
  value: number;
  increase: number;
}

const getElem = (id: string): HTMLElement => document.getElementById(id);
const getVal = (id: string): number => parseInt((getElem(id))['value']);
const fromClick = (id: string) => fromEvent(getElem(id), 'click');
const fromClickAndMapTo = (id: string, obj: {}) => fromClick(id).pipe(mapTo(obj));
const fromClickAndMap = (id: string, fn: (_) => {}) => fromClick(id).pipe(map(fn));
const setValue = (val: number) => getElem('counter').innerText = val.toString()

const events$ =
  merge(
    fromClickAndMapTo('start', { count: true }),
    fromClickAndMapTo('pause', { count: false }),
    fromClickAndMapTo('reset', { value: 10 }),
    fromClickAndMap('setto', _ => ({ value: getVal('value') }))
  );

const stopWatch$ = events$.pipe(
  startWith({ count: false, speed: 1000, value: 10, increase: 1 }),
  scan((state: State, curr): State => ({ ...state, ...curr }), {}),
  tap((state: State) => setValue(state.value)),
  switchMap((state: State) => state.count
    ? interval(state.speed)
      .pipe(
        takeWhile( () => state.value > 0 ),
        tap(_ => state.value -= state.increase),
        tap(_ => setValue(state.value))
      )
    : NEVER)
);

stopWatch$.subscribe();