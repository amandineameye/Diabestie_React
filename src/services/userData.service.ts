import axios from "axios";
import type { UserData, Meal } from "../@types/usersData";

const url = "http://localhost:8000/userData";

export async function fetchUserData(): Promise<UserData> {
	const token = localStorage.getItem("authToken");
	const headers = {
		headers: {
			authorization: `Bearer ${token}`, // Include the token in the request headers
		},
	};
	const response = await axios.get<UserData>(url, headers);
	const data = response.data;

	return data;
}
