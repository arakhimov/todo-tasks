import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import errorReducer from "./errors";
import { logger } from "./middleware/logger";
import taskReducer from "./task";

const rootReducer = combineReducers({
  errors: errorReducer,
  tasks: taskReducer
});

function createStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production"
  });
}

export default createStore;

// import { applyMiddleware, compose, createStore } from "redux";
// import { logger } from "./middleware/logger";
// import { thunk } from "./middleware/thunk";
// import taskReducer from "./task";

// const middlewareEnhancer = applyMiddleware(logger, thunk);

// function configureStore() {
//   return createStore(
//     taskReducer,
//     compose(
//       middlewareEnhancer,
//       window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
//   );
// }

// export default configureStore;
