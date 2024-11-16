import style from "./Login.module.css";
import { useState } from "react";
import axios from "axios";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post("http://localhost:8000/auth/login", {
				username,
				password,
			});
			const token = response.data.token;
			localStorage.setItem("authToken", token);
			console.log("Token stored in localStorage:", token);
		} catch (error) {
			console.error("Login failed:", error);
		}
	};

	return (
		<>
			<form className={style.loginForm} onSubmit={handleSubmit}>
				<div>
					<label htmlFor="username">Username: </label>
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
					<label htmlFor="password">Password: </label>
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
			</form>
		</>
	);
};

export default Login;
