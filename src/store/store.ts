import { configureStore } from "@reduxjs/toolkit";
import usersDataReducer from "./usersData/usersData.reducer";
import mealDataReducer from "./mealData/mealData.reducer";

export const store = configureStore({
	reducer: {
		userData: usersDataReducer,
		mealData: mealDataReducer,
	},
});
export type AppStore = typeof store;
export type StateStore = ReturnType<AppStore["getState"]>;

export default store;
