import axios from "axios";

const baseUrl = "https://diabestie-api.vercel.app/general/";

type NamesObject = {
	firstName: string;
	username: string;
};

export const fetchUserNames = async (): Promise<NamesObject> => {
	const token = localStorage.getItem("authToken");
	const headers = {
		headers: {
			authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.get(baseUrl + "getUserNames", headers);
	const data = response.data;
	return data as NamesObject;
};
