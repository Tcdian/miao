import _ from 'lodash';
import { at } from '../source/object';

const object = { a: [{ b: { c: 3 } }, 4] };

test(`at(object, ['a[0].b.c', 'a[1]']) => ${at(object, ['a[0].b.c', 'a[1]'])}`, () => {
    expect(at(object, ['a[0].b.c', 'a[1]'])).toEqual(_.at(object, ['a[0].b.c', 'a[1]']));
});