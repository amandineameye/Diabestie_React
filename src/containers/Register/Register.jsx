import { useState } from "react";
import style from "./Register.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { postRegistration } from "../../services/auth.service.js";
import rainbow from "../../assets/rainbow.png";

const Register = () => {
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [password, setPassword] = useState("");
	const [passwordCheck, setPasswordCheck] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (!password || !firstName || !username || !passwordCheck) {
				console.log("Please fill in all fields");
				setErrorMessage("Please fill in all fields");
				return;
			}

			if (password !== passwordCheck) {
				console.log("Passwords do not match");
				setErrorMessage("Passwords do not match");
				return;
			}

			const response = await postRegistration(firstName, username, password);

			if (response && response.status === 400) {
				console.log(response.data.message);
				setErrorMessage(response.data.message);
				return;
			}

			if (!response || !response.data) {
				console.log("Username already exists");
				setErrorMessage("Username already exists");
				return;
			}
			const token = response.data.token;
			localStorage.setItem("authToken", token);
			console.log("Token stored in localStorage:", token);
			console.log("UserId: ", response.data.userId);
			console.log("Response message: ", response.data.message);
			console.log("Response data: ", JSON.stringify(response.data));
			navigate("/");
		} catch (error) {
			console.log(error);
			setErrorMessage("An error has occurred. Try again later");
		}
	};

	return (
		<>
			<div className={style.mainContainer}>
				<form className={style.registerForm} onSubmit={handleSubmit}>
					<p className={style.appName}>
						<img src={rainbow} alt="logo" className={style.appLogo} />
						Diabestie
					</p>
					<h1>Welcome</h1>
					{errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
					<div>
						<input
							type="text"
							name="firstName"
							placeholder="First name"
							value={firstName}
							onChange={(e) => {
								setFirstName(e.target.value);
							}}
						></input>

						<input
							type="text"
							name="username"
							placeholder="Username"
							value={username}
							onChange={(e) => {
								setUsername(e.target.value);
							}}
						></input>

						<input
							type="password"
							name="password"
							placeholder="Password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						></input>

						<input
							type="password"
							name="passwordCheck"
							placeholder="Confirm password"
							value={passwordCheck}
							onChange={(e) => {
								setPasswordCheck(e.target.value);
							}}
						></input>
					</div>
					<button type="submit">Register</button>
					<p className={style.haveAnAccountP}>
						Have an account? <Link to="/login">Log in</Link>
					</p>
				</form>
			</div>
		</>
	);
};

export default Register;
