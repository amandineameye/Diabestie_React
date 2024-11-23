import style from "./DeleteButton.module.css";

const DeleteButton = ({ onDeleteAction = () => {} }) => {
	return (
		<button onClick={onDeleteAction} className={style.deleteButton}>
			🗑️
		</button>
	);
};

export default DeleteButton;
