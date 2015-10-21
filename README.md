redux-localstorage-slicer
==================

Custom slicer for
[redux-localstorage](https://github.com/elgerlambert/redux-localstorage) that
allows reducers to define their own persistence configuration.

## Usage with redux-localstorage

```js
import compose from 'redux';
import persistState from 'redux-localstorage';
import persistSlicer from 'redux-localstorage-slicer';


const createPersistentStore = compose(
  persistState(null, {
    slicer: persistSlicer()
  })
)
```

## Usage with Redux reducers

**myReducer.js**

Setting state.__persist to ```true``` will persist the whole substate
managed by the reducer.

```js
// Both state.foo and state.bar will be persisted.
const initialState = {
  __persist: true,
  foo: 'foo',
  bar: 'bar',
};
```

Setting state.__persist to a transformer function or array of keys will
allow the reducer to further slice the substate it manages.

```js
// Only state.foo will be persisted.
const initialState = {
  __persist: state => state.foo,
  foo: 'foo',
  bar: 'bar',
};
```

```js
// Only state.bar will be persisted.
const initialState = {
  __persist: ['bar'],
  foo: 'foo',
  bar: 'bar',
};
```

## localStorage Versioning

We can pass a version number into ```persistSlicer```. Whenever the slicer
detects that we have set a number and that we have updated that number, then
the slicer will go ahead to invalidate localStorage.redux.

```js
const REDUX_LOCALSTORAGE_VERSION = 1;

persistState(null {
  slicer: persistSlicer(REDUX_LOCALSTORAGE_VERSION)
});
