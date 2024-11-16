import axios from "axios";
import type { UserData, Meal } from "../@types/usersData";

const BASE_URL = "http://localhost:8000/userData/__USERNAME__";

export async function fetchUserData(userName: string): Promise<UserData> {
	const url = BASE_URL.replace("__USERNAME__", userName);
	const response = await axios.get<UserData>(url);
	const data = response.data;

	return data;
}
