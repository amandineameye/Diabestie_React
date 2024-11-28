import style from "./DeleteButton.module.css";
import clsx from "clsx";
import { useLocation } from "react-router-dom";

const DeleteButton = ({ onDelete = () => {} }) => {
	const pathname = useLocation().pathname;

	const buttonClassName = clsx(
		style.deleteButton,
		pathname === "/" && style.dashboardDeleteButton
	);

	return (
		<button onClick={onDelete} className={buttonClassName}>
			🗑️
		</button>
	);
};

export default DeleteButton;
