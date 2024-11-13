import style from "./DeleteButton.module.css";

const DeleteButton = ({ page, onDeleteAction = () => {} }) => {
	return (
		<button
			onClick={onDeleteAction}
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
