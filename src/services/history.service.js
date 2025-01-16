import axios from "axios";

const baseUrl = "https://diabestie-api.vercel.app/history/";

const putTokenInHeaders = () => {
	const token = localStorage.getItem("authToken");
	return {
		headers: {
			authorization: `Bearer ${token}`,
		},
	};
};

export const getFilteredMeals = async ({
	page = 1,
	unitsTarget = undefined,
	gramsTarget = undefined,
	tag = undefined,
}) => {
	{
		try {
			const headers = putTokenInHeaders();
			const params = new URLSearchParams();
			if (page) params.append("page", page);
			if (unitsTarget) params.append("unitsTarget", unitsTarget);
			if (gramsTarget) params.append("gramsTarget", gramsTarget);
			if (tag) params.append("tag", tag);
			const response = await axios.get(
				baseUrl + "getFilteredMeals?" + params,
				headers
			);
			return response.data;
		} catch (error) {
			if (error.response) {
				console.log("Error response status:", error.response.status);
				console.log("Error response data:", error.response.data);
				return error.response; // Return error response so it can be checked in handleSubmit (as the response of the request)
			}
			console.log("Unexpected error:", error.message);
			throw error; // Rethrow if it's a non-HTTP error
		}
	}
};
