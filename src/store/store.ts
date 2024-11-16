import { configureStore } from "@reduxjs/toolkit";
import usersDataReducer from "./usersData/usersData.reducer";

export const store = configureStore({
	reducer: {
		userData: usersDataReducer,
	},
});
export type AppStore = typeof store;
export type StateStore = ReturnType<AppStore["getState"]>;

export default store;
