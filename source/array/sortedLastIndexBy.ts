import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueIterator<T, R> = (value: T) => R;
type ValueIterateeCustom<T, R> = ValueIterator<T, R> | IterateeShorthand<T>;

function sortedLastIndexBy<T>(array: T[], value: T, predicate: ValueIterateeCustom<T, unknown> = identity): number {
    const iterativeFunc = iteratee(predicate);
    if (value < array[0]) {
        return 0;
    }
    let left = 0;
    let right = array.length - 1;
    while (left < right) {
        const mid = Math.ceil((left + right) / 2);
        if (iterativeFunc(array[mid]) > iterativeFunc(value)) {
            right = mid - 1;
        } else {
            left = mid;
        }
    }
    return left + 1;
}

export { sortedLastIndexBy };
