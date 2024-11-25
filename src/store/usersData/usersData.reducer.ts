import { createReducer } from "@reduxjs/toolkit";
import { getOneUserData, getUserNames } from "./usersData.action";
import { UserData } from "../../@types/usersData";

type UserNames = {
	firstName: string;
	username: string;
};

type userDataReducerState = {
	isLoading: boolean;
	data?: UserNames;
	error?: string;
};

const initialState: userDataReducerState = {
	isLoading: false,
	data: undefined,
	error: undefined,
};

const usersDataReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(getUserNames.pending, (state) => {
			state.isLoading = true;
			state.data = undefined;
			state.error = undefined;
		})
		.addCase(getUserNames.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		})
		.addCase(getUserNames.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message ?? "Oups !";
		});
});

export default usersDataReducer;
