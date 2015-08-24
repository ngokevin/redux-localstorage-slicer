export default function createSlicer() {
  // Slicer that allows each reducer to define their own persist configuration.
  return paths => {
    return state => {
      let syncedState = {};

      Object.keys(state).forEach(path => {
        // Loop through each branch of the state, building our synced state.
        const substate = state[path];

        if (substate.__persist) {
          // Only persist if __persist is specified.
          const persist = substate.__persist;

          if (persist === true) {
            // Sync the whole state if __persist is just `true`.
            syncedState[path] = substate;

          } else if (persist.constructor === Function) {
            // Sync state according to function.
            const subsubstate = persist(substate);

            // Always have to keep __persist around.
            if (!subsubstate.__persist) {
              subsubstate.__persist = persist;
            }
            syncedState[path] = subsubstate;

          } else if (persist.constructor === Array) {
            // Sync state filtering by array of keys.
            const subsubstate = {};
            persist.forEach(key => {
              subsubstate[key] = substate[key];
            });

            // Always have to keep __persist around.
            if (!subsubstate.__persist) {
              subsubstate.__persist = persist;
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
