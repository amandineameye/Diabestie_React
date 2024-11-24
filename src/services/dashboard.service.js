import axios from "axios";

const baseUrl = "http://localhost:8000/dashboard/";

const putTokenInHeaders = () => {
	const token = localStorage.getItem("authToken");
	return {
		headers: {
			authorization: `Bearer ${token}`,
		},
	};
};

export const fetchNote = async () => {
	try {
		const headers = putTokenInHeaders();
		const response = await axios.get(baseUrl + "getNote", headers);
		return response.data.note;
	} catch (error) {
		console.log(error);
	}
};

export const patchNote = async (note) => {
	try {
		const headers = putTokenInHeaders();
		const response = await axios.patch(
			baseUrl + "updateNote",
			{ updatedNote: note },
			headers
		);
		console.log(response.data);
	} catch (error) {
		console.log(error);
	}
};

export const fetchMealsSummary = async () => {
	try {
		const headers = putTokenInHeaders();
		const response = await axios.get(baseUrl + "getMealsSummary", headers);
		return response.data.meals;
	} catch (error) {
		console.log(error);
	}
};
