import { createReducer } from "@reduxjs/toolkit";
import {
	carbAdd,
	quantityAdd,
	carbDelete,
	tagAdd,
	bloodSugarAdd,
	totalBolusAdd,
	correctionBolusAdd,
	mealBolusAdd,
} from "./mealData.action";

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
	bloodSugarBefore: number | undefined;
	bolus: BolusesObject;
};

type TagsObject = {
	firstMeal: boolean;
	snack: boolean;
	wasActiveBefore: boolean;
};

type BolusesObject = {
	totalBolus: number | undefined;
	mealBolus: number | undefined;
	correctionBolus: number | undefined;
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
	bloodSugarBefore: undefined,
	bolus: {
		totalBolus: undefined,
		mealBolus: undefined,
		correctionBolus: undefined,
	},
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
			if (targetCarb && targetCarb.carbsResult) {
				state.totalCarbs = state.totalCarbs - targetCarb.carbsResult;
			}
			if (targetCarb && targetCarb.carbsRate) {
				targetCarb.carbsGrams = quantityObject.carbsGrams;
				targetCarb.carbsResult = parseFloat(
					(targetCarb.carbsGrams * targetCarb.carbsRate).toFixed(1)
				);
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
		})
		.addCase(bloodSugarAdd, (state, action) => {
			const bloodSugar = action.payload;
			state.bloodSugarBefore = bloodSugar;
		})
		.addCase(totalBolusAdd, (state, action) => {
			const bolus = action.payload;
			state.bolus.totalBolus = bolus;
		})
		.addCase(correctionBolusAdd, (state, action) => {
			const correctionBolus = action.payload;
			state.bolus.correctionBolus = correctionBolus;
		})
		.addCase(mealBolusAdd, (state, action) => {
			const mealBolus = action.payload;
			state.bolus.mealBolus = mealBolus;
		});
});

export default mealDataReducer;
