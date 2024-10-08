import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./Slice";

const store = configureStore({
  reducer: {
    api: apiReducer,
  },
});
export default store;
// // TypeScript types for state and dispatch
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
