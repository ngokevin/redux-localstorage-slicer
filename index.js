"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createSlicer;

function createSlicer() {
  // Slicer that allows each reducer to define their own persist configuration.
  return function (paths) {
    return function (state) {
      var syncedState = {};

      Object.keys(state).forEach(function (path) {
        // Loop through each branch of the state, building our synced state.
        var substate = state[path];

        if (substate.__persist) {
          // Only persist if __persist is specified.
          var persist = substate.__persist;

          if (persist === true) {
            // Sync the whole state if __persist is just `true`.
            syncedState[path] = substate;
          } else if (persist.constructor === Function) {
            // Sync state according to function.
            var subsubstate = persist(substate);

            // Always have to keep __persist around.
            if (!subsubstate.__persist) {
              subsubstate.__persist = persist;
            }
            syncedState[path] = subsubstate;
          } else if (persist.constructor === Array) {
            (function () {
              // Sync state filtering by array of keys.
              var subsubstate = {};
              persist.forEach(function (key) {
                subsubstate[key] = substate[key];
              });

              // Always have to keep __persist around.
              if (!subsubstate.__persist) {
                subsubstate.__persist = persist;
              }
              syncedState[path] = subsubstate;
            })();
          } else if (persist.constructor === String) {
            // Deserialized a stored persist function. eval is OK here, right?
            syncedState[path] = eval(persist)(substate);
          }
        }
      });

      return syncedState;
    };
  };
}

exports.createSlicer = createSlicer;
