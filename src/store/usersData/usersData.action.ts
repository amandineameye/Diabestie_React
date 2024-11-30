import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserNames } from "../../services/general.service";

type NamesObject = {
	firstName: string;
	username: string;
};

export const getUserNames = createAsyncThunk(
	"userNames/get",
	async (): Promise<NamesObject> => {
		const namesObject: NamesObject = await fetchUserNames();
		return namesObject;
	}
);
