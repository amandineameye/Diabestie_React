import { createReducer } from "@reduxjs/toolkit";
import { carbAdd } from "./carbsData.action";

type carbObjectFinal = {
	id: string;
	carb: string;
	carbsRate: number;
	carbsGrams: number;
};
// Define carbsDataReducerState as an array of optional carbObjectFinal properties
type carbsDataReducerState = Array<Partial<carbObjectFinal>>;

const initialState: carbsDataReducerState = [];

const carbsDataReducer = createReducer(initialState, (builder) => {
	builder.addCase(carbAdd, (state, action) => {
		const carbObject = action.payload;
		state.push(carbObject);
	});
});

export default carbsDataReducer;
