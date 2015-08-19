'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

describe('redux-localstorage-slicer', function () {
  it('handles undefined persist', function () {
    var state = {
      fooState: {
        bar: 'bar'
      }
    };
    _assert2['default'].deepEqual((0, _index2['default'])()()(state), {});
  });

  it('handles persist is true', function () {
    var state = {
      fooState: {
        meta: {
          persist: true
        },
        bar: 'bar',
        foo: 'foo'
      }
    };
    _assert2['default'].deepEqual((0, _index2['default'])()()(state), {
      fooState: {
        meta: {
          persist: true
        },
        bar: 'bar',
        foo: 'foo'
      }
    });
  });

  it('handles persist is function', function () {
    var state = {
      fooState: {
        meta: {
          persist: function persist(state) {
            delete state.foo;
            return state;
          }
        },
        bar: 'bar',
        foo: 'foo'
      }
    };

    var slicedState = (0, _index2['default'])()()(state);
    _assert2['default'].ok(slicedState.fooState.bar);
    _assert2['default'].ok(!slicedState.fooState.foo);
    _assert2['default'].ok(slicedState.fooState.meta);
  });

  it('handles persist is array', function () {
    var state = {
      fooState: {
        meta: {
          persist: ['foo']
        },
        bar: 'bar',
        foo: 'foo'
      }
    };
    _assert2['default'].deepEqual((0, _index2['default'])()()(state), {
      fooState: {
        meta: {
          persist: ['foo']
        },
        foo: 'foo'
      }
    });
  });
});
