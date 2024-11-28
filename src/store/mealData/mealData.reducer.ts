import { createReducer } from "@reduxjs/toolkit";
import { carbAdd, quantityAdd, carbDelete } from "./mealData.action";

type carbObjectFinal = {
	id: string;
	carb: string;
	carbsRate: number;
	carbsGrams: number;
	carbsResult: number;
};
// Define carbsDataReducerState as an array of optional carbObjectFinal properties
type mealDataReducerState = {
	totalCarbs: number;
	carbsData: Array<Partial<carbObjectFinal>>;
};

const initialState: mealDataReducerState = {
	totalCarbs: 0,
	carbsData: [],
};

const mealDataReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(carbAdd, (state, action) => {
			const carbObject = action.payload;
			state.carbsData.push(carbObject);
		})
		.addCase(quantityAdd, (state, action) => {
			const quantityObject = action.payload;
			const targetCarb = state.carbsData.find((carbObject) => {
				return carbObject.id === quantityObject.id;
			});
			if (targetCarb && targetCarb.carbsRate) {
				targetCarb.carbsGrams = quantityObject.carbsGrams;
				targetCarb.carbsResult = targetCarb.carbsGrams * targetCarb.carbsRate;
				state.totalCarbs += targetCarb.carbsResult;
				// Same as state.totalCarbs = state.totalCarbs + targetCarb.carbsResult;
			}
		})
		.addCase(carbDelete, (state, action) => {
			const carbId = action.payload;
			state.carbsData = state.carbsData.filter((carbObject) => {
				return carbObject.id !== carbId;
			});
		});
});

export default mealDataReducer;
