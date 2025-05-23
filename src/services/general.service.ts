import axios from "axios";

const apiURL = process.env.VITE_API_URL + '/general';


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
	const response = await axios.get(apiURL + "/getUserNames", headers);
	const data = response.data;
	return data as NamesObject;
};
