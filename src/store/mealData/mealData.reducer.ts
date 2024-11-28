import { createReducer } from "@reduxjs/toolkit";
import { carbAdd, quantityAdd, carbDelete, tagAdd } from "./mealData.action";

type CarbObjectFinal = {
	id: string;
	carb: string;
	carbsRate: number;
	carbsGrams: number;
	carbsResult: number;
};
// Define carbsDataReducerState as an array of optional carbObjectFinal properties
type MealDataReducerState = {
	totalCarbs: number;
	carbsData: Array<Partial<CarbObjectFinal>>;
	tags: TagsObject;
	time: Date | undefined;
};

type TagsObject = {
	firstMeal: boolean;
	snack: boolean;
	wasActiveBefore: boolean;
};

const initialState: MealDataReducerState = {
	totalCarbs: 0,
	carbsData: [],
	tags: {
		firstMeal: false,
		snack: false,
		wasActiveBefore: false,
	},
	time: undefined,
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
			const deletedCarbObject = state.carbsData.find((carbObject) => {
				return carbObject.id === carbId;
			});
			if (deletedCarbObject && deletedCarbObject.carbsResult !== undefined) {
				state.totalCarbs = state.totalCarbs - deletedCarbObject.carbsResult;
			}

			state.carbsData = state.carbsData.filter((carbObject) => {
				return carbObject.id !== carbId;
			});
		})
		.addCase(tagAdd, (state, action) => {
			const tagName = action.payload;
			state.tags[tagName] = state.tags[tagName] === true ? false : true;
		});
});

export default mealDataReducer;
