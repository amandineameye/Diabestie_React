import Register from "../../containers/Register/Register";
import style from './RegisterPage.module.css'

const RegisterPage = () => {
	return (
		<>
			<main className={style.registerPage}>
				<Register />
			</main>
		</>
	);
};

export default RegisterPage;
