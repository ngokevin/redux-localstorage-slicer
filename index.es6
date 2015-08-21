export default function createSlicer() {
  // Slicer that allows each reducer to define their own persist configuration.
  return paths => {
    return state => {
      let syncedState = {};

      Object.keys(state).forEach(path => {
        // Loop through each branch of the state, building our synced state.
        const substate = state[path];

        if (substate._meta && substate._meta.persist) {
          // Only persist if _meta.persist is specified.
          const persist = substate._meta.persist;

          if (persist === true) {
            // Sync the whole state if _meta.persist is just `true`.
            syncedState[path] = substate;

          } else if (persist.constructor === Function) {
            // Sync state according to function.
            const subsubstate = persist(substate);

            // Always have to keep _meta.persist around.
            if (!subsubstate._meta) {
              subsubstate._meta = {};
            }
            if (!subsubstate._meta.persist) {
              subsubstate._meta.persist = persist;
            }
            syncedState[path] = subsubstate;

          } else if (persist.constructor === Array) {
            // Sync state filtering by array of keys.
            const subsubstate = {};
            persist.forEach(key => {
              subsubstate[key] = substate[key];
            });

            // Always have to keep _meta.persist around.
            if (!subsubstate._meta) {
              subsubstate._meta = {};
            }
            if (!subsubstate._meta.persist) {
              subsubstate._meta.persist = persist;
            }
            syncedState[path] = subsubstate;

          } else if (persist.constructor === String) {
            // Deserialized a stored persist function. eval is OK here, right?
            syncedState[path] = eval(persist)(substate);
          }
        }
      });

      return syncedState;
    }
  }
}
export {createSlicer};
