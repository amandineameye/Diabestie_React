// React, Routing and Redux
import { useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// Styles and Assets
import style from "./NavBar.module.css";
import rainbowIcon from "../../assets/rainbow.png";
import logOutIcon from "../../assets/exit.png";

// MUI Icons
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PersonIcon from "@mui/icons-material/Person";

// Utilities
import { checkTokenPresentAndUnexpired } from "../../tools/authTools";

const Title = () => (
	<div className={style.navTitle}>
		<img src={rainbowIcon} alt="logo" className={style.logoIcon} />
		<p>Diabestie</p>
	</div>
);

const LinkList = () => {
	const listIconStyle = {
		fontSize: "1.2rem",
	};
	const getNavLinkClass = ({ isActive }) => (isActive ? style.active : "");
	const links = [
		{
			label: "Dashboard",
			to: "/",
			icon: <SpaceDashboardIcon sx={listIconStyle} />,
		},
		{
			label: "New meal",
			to: "/addMeal",
			icon: <AddCircleOutlinedIcon sx={listIconStyle} />,
		},
		{
			label: "Meals history",
			to: "/history",
			icon: <AccessTimeFilledIcon sx={listIconStyle} />,
		},
		{
			label: "Graphs",
			to: "/graphs",
			icon: <BarChartOutlinedIcon sx={listIconStyle} />,
		},
	];

	return (
		<ul className={style.linksList}>
			{links.map(({ label, to, icon }) => {
				return (
					<li key={label}>
						<NavLink to={to} className={getNavLinkClass}>
							{icon}
							<p>{label}</p>
						</NavLink>
					</li>
				);
			})}
		</ul>
	);
};

const UserInfo = ({ username, onLogOut }) => (
	<div className={style.account}>
		<PersonIcon className={style.userIcon} />
		<p>{username}</p>
		<img
			src={logOutIcon}
			alt="log out icon"
			onClick={onLogOut}
			className={style.logOutIcon}
		/>
	</div>
);

const NavBar = () => {
	const navigate = useNavigate();
	const location = useLocation();
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
	}, [navigate, location]);

	return (
		<nav>
			<Title />
			<LinkList />
			<UserInfo username={username} onLogOut={handleLogOutClick} />
		</nav>
	);
};

export default NavBar;
