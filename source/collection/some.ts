import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { isArray } from '../lang/isArray';
import { isString } from '../lang/isString';
import { entries } from '../object/entries';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ArrayIterator<T, R> = (value: T, index: number, collection: T[]) => R;
type ArrayIterateeCustom<T, R> = ArrayIterator<T, R> | IterateeShorthand<T>;
type StringIterator<R> = (char: string, index: number, string: string) => R;
type StringIterateeCustom<R> = StringIterator<R> | IterateeShorthand<string>;
type RecordIterator<K extends PropertyName, V, R> = (value: V, key: K, collection: Record<K, V>) => R;
type RecordIterateeCustom<K extends PropertyName, V, R> = RecordIterator<K, V, R> | IterateeShorthand<V>;

function some<T>(collection: T[], predicate?: ArrayIterateeCustom<T, boolean>): boolean;
function some(collection: string, predicate?: StringIterateeCustom<boolean>): boolean;
function some<K extends PropertyName, V>(
    collection: Record<K, V>,
    predicate?: RecordIterateeCustom<K, V, boolean>
): boolean;
function some(collection: any, predicate: any = identity): boolean {
    const iterativeFunc = iteratee(predicate);
    return entries(collection).some(([key, value]: [PropertyName, unknown]) => {
        key = isArray(collection) || isString(collection) ? Number(key) : key;
        return iterativeFunc(value, key, collection);
    });
}

export { some };
