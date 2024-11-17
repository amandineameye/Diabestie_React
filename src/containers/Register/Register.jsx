import { useState } from "react";
import style from "./Register.module.css";
import { Link } from "react-router-dom";

const Register = () => {
	const handleSubmit = (e) => {
		e.preventDefault();

		if (!password || !firstName || !username || !passwordCheck) {
			console.log("You need to fill in every input");
			return;
		}

		if (password !== passwordCheck) {
			console.log("Passwords do not match");
			return;
		}

		//Check in the database if the username exists. If it does, console.log that it needs another and return
		//If it does not, create a new user in the database with firstName, username and password
		//Create a token and set it in localStorage
		//Then navigate to the dashboard
	};

	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [password, setPassword] = useState("");
	const [passwordCheck, setPasswordCheck] = useState("");

	return (
		<>
			<form className={style.registerForm} onSubmit={handleSubmit}>
				<h1>Register to continue</h1>
				<div>
					<label htmlFor="firstName">First name</label>
					<input
						type="text"
						name="firstName"
						value={firstName}
						onChange={(e) => {
							setFirstName(e.target.value);
						}}
					></input>
				</div>
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
				<div>
					<label htmlFor="passwordCheck">Confirm password</label>
					<input
						type="password"
						name="passwordCheck"
						value={passwordCheck}
						onChange={(e) => {
							setPasswordCheck(e.target.value);
						}}
					></input>
				</div>
				<button type="submit">Register</button>
				<p>
					Have an account? <Link to="/login">Log in</Link>
				</p>
			</form>
		</>
	);
};

export default Register;
