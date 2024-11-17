import style from "./Login.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOneUserData } from "../../store/usersData/usersData.action";
import { Link } from "react-router-dom";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (!username || !password) {
				console.log("Please fill in both fields.");
				return;
			}
			const response = await axios.post("http://localhost:8000/auth/login", {
				username,
				password,
			});
			const token = response.data.token;
			localStorage.setItem("authToken", token);
			console.log("Token stored in localStorage:", token);

			dispatch(getOneUserData());
			navigate("/");
		} catch (error) {
			console.log(error.response?.data?.error || error.message);
		}
	};

	return (
		<>
			<form className={style.loginForm} onSubmit={handleSubmit}>
				<h1>Log in to continue</h1>
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
				<p>
					Don't have an account yet? <Link to="/register">Register</Link>
				</p>
			</form>
		</>
	);
};

export default Login;
