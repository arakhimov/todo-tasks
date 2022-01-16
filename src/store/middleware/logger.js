export function logger({ getState, dispatch }) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      // if (action.type === "task/update") {
      //   dispatch(taskDeleted(action.payload.id));
      // }

      return next(action);
    };
  };
}
