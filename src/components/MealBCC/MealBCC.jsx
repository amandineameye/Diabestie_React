import style from "./MealBCC.module.css";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import CookieIcon from "@mui/icons-material/Cookie";
import CookieOutlinedIcon from "@mui/icons-material/CookieOutlined";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import FreeBreakfastOutlinedIcon from "@mui/icons-material/FreeBreakfastOutlined";
import breakfast from "../../assets/oatmeal.png";
import donut from "../../assets/donut.png";
import heartBeat from "../../assets/heart.png";

const MealBCC = ({
	carbsGrams,
	bolus,
	change,
	firstMeal,
	snack,
	wasActive,
}) => {
	let pathname = useLocation().pathname;

	const divClassName = clsx(
		style.row,
		pathname === "/" && style.dashboardRow,
		pathname === "/addMeal" && style.addMeal2Row,
		pathname === "/history" && style.historyRow
	);
	return (
		<div className={divClassName}>
			<div className={style.cell}>
				<p>Bolus</p>
				<p className={style.bolus}>{bolus}</p>
			</div>
			<div className={style.cell}>
				<p>Carbs</p>
				<p className={style.carbs}>{Math.round(carbsGrams)}</p>
			</div>
			<div className={style.cell}>
				<p>Change</p>
				<p className={style.change}>{change}</p>
			</div>
			{(pathname === "/history" || pathname === "/addMeal") && (
				<div className={style.tagsDiv}>
					{firstMeal && (
						<div>
							{/* <FreeBreakfastOutlinedIcon className={style.icon} /> */}
							<img src={breakfast} alt="first meal tag" />
						</div>
					)}
					{snack && (
						<div>
							{/* <CookieOutlinedIcon className={style.icon} /> */}
							<img src={donut} alt="snack tag" />
						</div>
					)}
					{wasActive && (
						<div>
							{/* <DirectionsRunIcon className={style.icon} /> */}
							<img
								src={heartBeat}
								className={style.heartIcon}
								alt="physical activity tag"
							/>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default MealBCC;
