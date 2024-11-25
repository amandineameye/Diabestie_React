import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserData } from "../../services/userData.service";
import { fetchUserNames } from "../../services/userNames.service.js";

export const getOneUserData = createAsyncThunk("userData/get", async () => {
	const result = await fetchUserData();
	return result;
});

export const getUserNames = createAsyncThunk("userNames/get", async () => {
	const namesObject = await fetchUserNames();
	return namesObject;
});
