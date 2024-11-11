import style from "./NavBar.module.css";
import logo from "../../assets/blood.png";
import { Link } from "react-router-dom";

const LinkList = ({ page }) => {
	return (
		<ul className={style.linksList}>
			<Link to="/">
				<li className={page === "dashboard" ? style.active : undefined}>
					<span>🏠</span>Dashboard
				</li>
			</Link>
			<Link to="/addMeal/step1">
				<li
					className={
						page === "addMeal1" || page === "addMeal2"
							? style.active
							: undefined
					}
				>
					<span>🍱</span>New meal
				</li>
			</Link>
			<Link to="/history">
				<li className={page === "history" ? style.active : undefined}>
					<span>🕣</span>Meals history
				</li>
			</Link>
			<Link to="/">
				<li>
					<span>📉</span>Graphs
				</li>
			</Link>
		</ul>
	);
};

const NavBar = ({ page }) => {
	return (
		<nav>
			<p className={style.navTitle}>
				<img src={logo} alt="logo" className={style.logoIcon} />
				Diabestie
			</p>
			<LinkList page={page} />
			<p className={style.account}>
				<span className={style.userIcon}>👤</span>Amandine Ameye
				<span className={style.logOutIcon}>🏃🏻‍♂️‍➡️</span>
			</p>
		</nav>
	);
};

export default NavBar;
