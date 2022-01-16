// import { createAction, createReducer } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import todoService from "../services/todo.service";
import { setErrors } from "./errors";

// const update = createAction("task/updated");
// const remove = createAction("task/removed");

// const initialState = [
// { id: 1, title: "Task 1", completed: false },
// { id: 2, title: "Task 2", completed: false },
// ];

const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
      // return action.payload;
    },
    update(state, action) {
      const elementEndex = state.entities.findIndex(
        el => el.id === action.payload.id
      );
      state.entities[elementEndex] = {
        ...state.entities[elementEndex],
        ...action.payload
      };
    },
    remove(state, action) {
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
      // return state.entities.filter(el => el.id !== action.payload.id);
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestFailed(state, action) {
      state.isLoading = false;
    },
    taskCreate(state, action) {
      state.entities.push(action.payload);
      state.isLoading = false;
    }
  }
});

// const taskRequested = createAction("task/requested");
// const taskRequestFailed = createAction("task/requestFailed");

const { actions, reducer } = taskSlice;
const {
  update,
  remove,
  recived,
  taskRequested,
  taskRequestFailed,
  taskCreate
} = actions;

export const loadTasks = () => async (dispatch, getState) => {
  dispatch(taskRequested());
  try {
    const data = await todoService.fetch();
    dispatch(recived(data));
  } catch (error) {
    dispatch(taskRequestFailed(error.message));
    dispatch(setErrors(error.message));
  }
};

export const completeTask = id => (dispatch, getState) => {
  dispatch(update({ id, completed: true }));
};

// export function taskCompleted(id) {
//   return update({ id, completed: true });
// }

export function titleChanged(id) {
  return update({ id, title: `New name for task ${id}` });
}

export function taskDeleted(id) {
  return remove({ id });
}

export const createTask = () => async (dispatch, getState) => {
  dispatch(taskRequested());
  try {
    const data = await todoService.create({
      title: "main.3fa6240e104d45f72646.hot-update.js",
      completed: true
    });
    dispatch(taskCreate(data));
  } catch (error) {
    dispatch(taskRequestFailed(error.message));
    dispatch(setErrors(error.message));
  }
};

export const getTasks = () => state => state.tasks.entities;
export const getTasksLoadingStatus = () => state => state.tasks.isLoading;

// через createReducer
// const reducer = createReducer(initialState, builder => {
//   builder
//     .addCase(update, (state, action) => {
//       const elementEndex = state.findIndex(el => el.id === action.payload.id);
//       state[elementEndex] = { ...state[elementEndex], ...action.payload };
//     })
//     .addCase(remove, (state, action) => {
//       return state.filter(el => el.id !== action.payload.id);
//     });
// });

// custom reducer
// function reducer(state, action) {
//   switch (action.type) {
//     case update.type: {
//       const newArray = [...state];
//       const elementEndex = newArray.findIndex(
//         el => el.id === action.payload.id
//       );
//       newArray[elementEndex] = { ...newArray[elementEndex], ...action.payload };
//       return newArray;
//     }
//     case remove.type: {
//       const newArray = [...state].filter(el => el.id !== action.payload.id);
//       return newArray;
//     }
//     default:
//       return state;
//   }
// }

export default reducer;
