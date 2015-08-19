import assert from 'assert';

import persistSlicer from './index';


describe('redux-localstorage-slicer', () => {
  it('handles undefined persist', () => {
    const state = {
      fooState: {
        bar: 'bar'
      }
    };
    assert.deepEqual(persistSlicer()()(state), {});
  });

  it('handles persist is true', () => {
    const state = {
      fooState: {
        meta: {
          persist: true
        },
        bar: 'bar',
        foo: 'foo'
      }
    };
    assert.deepEqual(persistSlicer()()(state), {
      fooState: {
        meta: {
          persist: true
        },
        bar: 'bar',
        foo: 'foo',
      }
    });
  });

  it('handles persist is function', () => {
    const state = {
      fooState: {
        meta: {
          persist: state => {
            delete state.foo;
            return state;
          }
        },
        bar: 'bar',
        foo: 'foo'
      }
    };

    const slicedState = persistSlicer()()(state);
    assert.ok(slicedState.fooState.bar);
    assert.ok(!slicedState.fooState.foo);
    assert.ok(slicedState.fooState.meta);
  });

  it('handles persist is array', () => {
    const state = {
      fooState: {
        meta: {
          persist: ['foo']
        },
        bar: 'bar',
        foo: 'foo'
      }
    };
    assert.deepEqual(persistSlicer()()(state), {
      fooState: {
        meta: {
          persist: ['foo']
        },
        foo: 'foo',
      }
    });
  });
});
