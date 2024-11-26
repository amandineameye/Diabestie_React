import axios from "axios";

const baseUrl = "http://localhost:8000/general/";

export const fetchUserNames = async () => {
	const token = localStorage.getItem("authToken");
	const headers = {
		headers: {
			authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.get(baseUrl + "getUserNames", headers);
	const data = response.data;
	return data;
};
