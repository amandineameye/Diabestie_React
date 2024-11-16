export type AllUsersData = UserData[];

export type UserData = {
	_id: string;
	firstName: string;
	userName: string;
	password: string;
	note: string;
	meals: Meal[];
};

export type Meal = {
	id: string;
	bloodSugarBefore: number;
	carbsGrams: number;
	bolus: number;
	firstMeal: boolean;
	snack: boolean;
	wasActiveBefore: boolean;
	date: string;
	time: string;
	bloodSugarAfter: number;
	wasActiveAfter: boolean;
};
