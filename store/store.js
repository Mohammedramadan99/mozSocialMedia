import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
// import users from "./usersSlice";
import usersReducer from "./usersSlice";
import postsReducer from "./postsSlice";
import commentsReducer from "./commentSlices";

const combinedReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer,
});

// const masterReducer = (state, action) => {
//     if (action.type === HYDRATE) {
//         const nextState = {
//             ...state, // use previous state
//             counter: {
//                 count: state.counter.count + action.payload.counter.count,
//             },
//             users: {
//                 users: [...action.payload.users.users, ...state.users.users]
//             }
//         }
//         return nextState;
//     } else {
//     return combinedReducer(state, action)
//   }
// }

export const makeStore = () =>
  configureStore({
    reducer: combinedReducer,
  });

export const wrapper = createWrapper(makeStore, { debug: true });
