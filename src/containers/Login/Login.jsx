import style from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { postCredentials } from "../../services/auth.service";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (!username || !password) {
				console.log("Please fill in both fields.");
				return;
			}
			const response = await postCredentials(username, password);

			if (response && response.status === 400) {
				console.log(response.data.message);
				setErrorMessage(response.data.message);
				return;
			}

			if (!response || !response.data) {
				console.log("One of the credentials is wrong");
				setErrorMessage("One of the credentials is wrong");
				return;
			}

			const token = response.data.token;
			localStorage.setItem("authToken", token);
			console.log("Token stored in localStorage:", token);
			navigate("/");
		} catch (error) {
			console.log(error.response?.data?.error || error.message);
		}
	};

	return (
		<>
			<form className={style.loginForm} onSubmit={handleSubmit}>
				<h1>Log in to continue</h1>
				{errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
				<div>
					<label htmlFor="username">Username</label>
					<input
						type="text"
						name="username"
						value={username}
						onChange={(e) => {
							setUsername(e.target.value);
						}}
					></input>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					></input>
				</div>
				<button type="submit">Login</button>
				<p className={style.haveAnAccountP}>
					Don't have an account yet? <Link to="/register">Register</Link>
				</p>
			</form>
		</>
	);
};

export default Login;
