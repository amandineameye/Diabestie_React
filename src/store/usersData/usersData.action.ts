import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserData } from "../../services/userData.service";

export const getOneUserData = createAsyncThunk("userData/get", async () => {
	const result = await fetchUserData();
	return result;
});
