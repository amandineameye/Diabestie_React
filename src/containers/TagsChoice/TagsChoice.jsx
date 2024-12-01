import style from "./TagsChoice.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tagAdd } from "../../store/mealData/mealData.action.ts";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import CookieOutlinedIcon from "@mui/icons-material/CookieOutlined";
import FreeBreakfastOutlinedIcon from "@mui/icons-material/FreeBreakfastOutlined";

const TagsChoice = () => {
	const [activeItems, setActiveItems] = useState({
		firstMeal: false,
		snack: false,
		wasActiveBefore: false,
	});

	const dispatch = useDispatch();
	const activeTagsObject = useSelector((state) => state.mealData.tags);
	console.log(activeTagsObject);

	const handleClick = (tag) => {
		// setActiveItems((prevObject) => ({
		// 	...prevObject,
		// 	[tag]: !prevObject[tag],
		// }));
		dispatch(tagAdd(tag));
	};

	useEffect(() => {
		setActiveItems(activeTagsObject);
	}, [activeTagsObject]);

	return (
		<div className={style.row}>
			<div className={style.cell}>
				<p>First meal</p>
				<div
					onClick={() => handleClick("firstMeal")}
					className={activeItems.firstMeal && style.active}
				>
					<FreeBreakfastOutlinedIcon />
				</div>
			</div>
			<div className={style.cell}>
				<p>Snack</p>
				<div
					onClick={() => handleClick("snack")}
					className={activeItems.snack && style.active}
				>
					<CookieOutlinedIcon />
				</div>
			</div>
			<div className={style.cell}>
				<p>Physical activity</p>
				<div
					onClick={() => handleClick("wasActiveBefore")}
					className={activeItems.wasActiveBefore && style.active}
				>
					<DirectionsRunIcon />
				</div>
			</div>
		</div>
	);
};

export default TagsChoice;
