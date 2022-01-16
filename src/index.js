import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getErrors } from "./store/errors";
import configureStore from "./store/store";
import {
  completeTask,
  createTask,
  getTasks,
  getTasksLoadingStatus,
  loadTasks,
  taskDeleted,
  titleChanged
} from "./store/task";

const store = configureStore();

const App = () => {
  // const [state, setState] = useState(store.getState());
  // const state = useSelector(state => state.tasks.entities);
  // const isLoading = useSelector(state => state.tasks.isLoading);
  // const error = useSelector(state => state.errors.entities[0]);
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getErrors());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
    // store.subscribe(() => {
    //   setState(store.getState());
    // });
  }, []);

  // function completeTask(taskId) {
  //   store.dispatch((getState, dispatch) => {
  //     store.dispatch(taskCompleted(taskId));
  //   });
  // }

  function changeTitle(taskId) {
    dispatch(titleChanged(taskId));
  }

  function deleteTask(taskId) {
    dispatch(taskDeleted(taskId));
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <p>Network Error</p>;
  }

  return (
    <>
      <h1>App</h1>
      {console.log(state)}
      <ul>
        {state.map(el => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Complete: ${el.completed}`}</p>
            <button type="button" onClick={() => dispatch(completeTask(el.id))}>
              Complete
            </button>
            <button type="button" onClick={() => changeTitle(el.id)}>
              Change title
            </button>
            <button type="button" onClick={() => deleteTask(el.id)}>
              Delete
            </button>
            <button type="button" onClick={() => dispatch(createTask())}>
              Create Task
            </button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
