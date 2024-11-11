import style from "./DeleteButton.module.css";

const DeleteButton = ({ page }) => {
	return (
		<button
			className={`${style.deleteButton} ${
				page === "dashboard"
					? style.postItDeleteButton
					: page === "addMeal1"
					? style.newCarbDeleteButton
					: ""
			}`}
		>
			🗑️
		</button>
	);
};

export default DeleteButton;
