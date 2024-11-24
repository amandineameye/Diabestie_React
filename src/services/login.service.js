import axios from "axios";

export const postCredentials = async (username, password) => {
	try {
		const response = await axios.post("http://localhost:8000/auth/login", {
			username,
			password,
		});
		return response;
	} catch (error) {
		console.log(error);
	}
};
