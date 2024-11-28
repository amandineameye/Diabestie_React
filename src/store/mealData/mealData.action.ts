import { createAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

type CarbObjectNew = {
	carb: string;
	carbsRate: number;
};

type CarbObjectWithoutQuantity = {
	carb: string;
	carbsRate: number;
	id: string;
};

type QuantityData = {
	id: string;
	carbsGrams: number;
};

type TagName = "firstMeal" | "snack" | "wasActiveBefore";

export const carbAdd = createAction("carb/add", (carbObject: CarbObjectNew) => {
	const payload: CarbObjectWithoutQuantity = {
		...carbObject,
		id: nanoid(),
	};

	return { payload };
});

export const quantityAdd = createAction<QuantityData>("carb/addQuantity");

export const carbDelete = createAction<string>("carb/delete");

export const tagAdd = createAction<TagName>("meal/addTag");

export const bloodSugarAdd = createAction<number>("meal/addBloordSugar");

export const correctionBolusAdd = createAction<number>(
	"meal/addCorrectionBolus"
);

export const mealBolusAdd = createAction<number>("meal/addMealBolus");

export const totalBolusAdd = createAction<number>("meal/addBolus");
