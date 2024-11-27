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

export const carbAdd = createAction("carb/add", (carbObject: CarbObjectNew) => {
	const payload: CarbObjectWithoutQuantity = {
		...carbObject,
		id: nanoid(),
	};

	return { payload };
});
