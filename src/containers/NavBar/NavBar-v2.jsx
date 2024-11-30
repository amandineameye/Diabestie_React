import style from "./NavBar.module.css";
import logo from "../../assets/blood.png";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkTokenPresentAndUnexpired } from "../../tools/authTools";

const LinkList = () => {
	return (
		<ul className={style.linksList}>
			<li>
				<NavLink
					to="/"
					className={({ isActive }) => (isActive ? style.active : "")}
				>
					<span>🏠</span>Dashboard
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/addMeal"
					className={({ isActive }) => (isActive ? style.active : "")}
				>
					<span>🍱</span>New meal
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/history"
					className={({ isActive }) => (isActive ? style.active : "")}
				>
					<span>🕣</span>Meals history
				</NavLink>
			</li>
			<li>
				<Link to="/">
					<span>📉</span>Graphs
				</Link>
			</li>
		</ul>
	);
};

const NavBar = () => {
	const navigate = useNavigate();
	const username = useSelector((state) => state.userData?.data?.username || "");

	const handleLogOutClick = () => {
		localStorage.removeItem("authToken");
		navigate("/login");
	};

	useEffect(() => {
		const isTokenValid = checkTokenPresentAndUnexpired();
		if (!isTokenValid) {
			navigate("/login");
		}
	}, [navigate]);

	return (
		<nav>
			<p className={style.navTitle}>
				<img src={logo} alt="logo" className={style.logoIcon} />
				Diabestie
			</p>
			<LinkList />
			<p className={style.account}>
				<span className={style.userIcon}>👤</span>
				{username}
				<span onClick={handleLogOutClick} className={style.logOutIcon}>
					🏃🏻‍♂️‍➡️
				</span>
			</p>
		</nav>
	);
};

export default NavBar;
