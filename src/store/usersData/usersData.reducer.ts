import { createReducer } from "@reduxjs/toolkit";
import { getOneUserData } from "./usersData.action";
import { UserData } from "../../@types/usersData";

type userDataReducerState = {
	isLoading: boolean;
	data?: UserData;
	error?: string;
};

const initialState: userDataReducerState = {
	isLoading: false,
	data: undefined,
	error: undefined,
};

const usersDataReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(getOneUserData.pending, (state) => {
			state.isLoading = true;
			state.data = undefined;
			state.error = undefined;
		})
		.addCase(getOneUserData.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		})
		.addCase(getOneUserData.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message ?? "Oups !";
		});
});

export default usersDataReducer;
