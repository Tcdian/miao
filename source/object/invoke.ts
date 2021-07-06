import { get } from './get';
import { toPath } from '../util/toPath';
import { last } from '../array/last';
import { initial } from '../array/initial';
import { isNil } from '../lang/isNil';
import { _toKey } from '../util/_toKey';

type PropertyName = string | number | symbol;
type Many<T> = T | T[];

function invoke(object: any, path: Many<PropertyName>, ...args: any[]): any {
    const formattedPath = toPath(path);
    const data = get(object, initial(formattedPath));
    const func = isNil(data) ? data : data[_toKey(last(formattedPath))];
    return isNil(func) ? undefined : func.call(data, ...args);
}

export { invoke };
