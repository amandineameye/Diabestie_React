import style from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { postCredentials } from "../../services/auth.service";
import rainbow from "../../assets/rainbow.png";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (!username || !password) {
				setErrorMessage("Please fill in both fields");
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
			<div className={style.mainContainer}>
				<form className={style.loginForm} onSubmit={handleSubmit}>
					<p className={style.appName}>
						<img src={rainbow} alt="logo" className={style.appLogo} />
						Diabestie
					</p>
					<h1>Welcome back</h1>
					{errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
					<div>
						<input
							type="text"
							name="username"
							value={username}
							placeholder="Username"
							onChange={(e) => {
								setUsername(e.target.value);
							}}
						></input>
						<input
							type="password"
							name="password"
							value={password}
							placeholder="Password"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						></input>
					</div>
					<button type="submit">Login</button>
					<p className={style.haveAnAccountP}>
						No account yet? <Link to="/register">Register</Link>
					</p>
				</form>
			</div>
		</>
	);
};

export default Login;
