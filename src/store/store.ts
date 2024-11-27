import { configureStore } from "@reduxjs/toolkit";
import usersDataReducer from "./usersData/usersData.reducer";
import carbsDataReducer from "./carbsData/carbsData.reducer";

export const store = configureStore({
	reducer: {
		userData: usersDataReducer,
		carbsData: carbsDataReducer,
	},
});
export type AppStore = typeof store;
export type StateStore = ReturnType<AppStore["getState"]>;

export default store;
