/**
 * Middleware always have the same signature:
 *   - Take in `dispatch` function
 *   - Return a function (take in `next`) that return another function (take in `action`) that do actual works
 * 
 */
export default function({ dispatch }) {
  return next => action => {
    // if action does not have payload
    // or, payload does not have `.then` property
    if (!action.payload || !action.payload.then) {
      return next(action);
    }

    // if payload is the Promise
    // make sure the action's promise resolves
    action.payload
      .then(function(response) {
        // create new action with old `type` but with resolved payload data
        const newAction = { ...action, payload: response };
        dispatch(newAction);
      });

  };
}




// es5 equivalent

/* export default function ({ dispatch }) {
  return function(next) {
    return function(action) {
      console.log(action);

      next(action);
    }
  }
} */