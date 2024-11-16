import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserData } from "../../services/userData.service";

export const getOneUserData = createAsyncThunk(
	"userData/get",
	async (userName: string) => {
		const result = await fetchUserData(userName);
		return result;
	}
);
