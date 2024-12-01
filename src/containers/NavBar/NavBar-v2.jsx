import style from "./NavBar.module.css";
import logo from "../../assets/blood.png";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkTokenPresentAndUnexpired } from "../../tools/authTools";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import FlatwareOutlinedIcon from "@mui/icons-material/FlatwareOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";

const LinkList = () => {
	const iconsSize = "1.2rem";
	return (
		<ul className={style.linksList}>
			<li>
				<NavLink
					to="/"
					className={({ isActive }) => (isActive ? style.active : "")}
				>
					<span>
						<SpaceDashboardIcon sx={{ fontSize: iconsSize }} />
					</span>
					Dashboard
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/addMeal"
					className={({ isActive }) => (isActive ? style.active : "")}
				>
					<AddCircleOutlinedIcon sx={{ fontSize: iconsSize }} /> New meal
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/history"
					className={({ isActive }) => (isActive ? style.active : "")}
				>
					<AccessTimeFilledIcon sx={{ fontSize: iconsSize }} /> Meals history
				</NavLink>
			</li>
			<li>
				<Link to="/">
					<BarChartOutlinedIcon sx={{ fontSize: iconsSize }} /> Graphs
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
				<PersonIcon className={style.userIcon} />
				{username}
				<ExitToAppOutlinedIcon
					onClick={handleLogOutClick}
					className={style.logOutIcon}
				/>
			</p>
		</nav>
	);
};

export default NavBar;
