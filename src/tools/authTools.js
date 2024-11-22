import { jwtDecode } from "jwt-decode";

export const checkTokenPresentAndUnexpired = () => {
	const token = localStorage.getItem("authToken");
	if (!token) {
		return false;
	}

	try {
		const decodedToken = jwtDecode(token);
		const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

		if (decodedToken.exp < currentTime) {
			localStorage.removeItem("authToken");
			return false;
		}
		return true;
	} catch (error) {
		console.log(error);
		localStorage.removeItem("authToken");
		return false;
	}
};
