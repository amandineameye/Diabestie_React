import Login from "../../containers/Login/Login";
import style from './LoginPage.module.css'

const LoginPage = () => {
	return (
		<>
			<main className={style.loginPage}>
				<Login />
			</main>
		</>
	);
};

export default LoginPage;
