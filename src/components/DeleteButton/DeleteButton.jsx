import style from "./DeleteButton.module.css";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DeleteOutlined, DeleteFilled } from "@ant-design/icons";

const DeleteButton = ({ onDelete = () => {} }) => {
	const pathname = useLocation().pathname;

	const buttonClassName = clsx(
		style.deleteButton,
		pathname === "/" && style.dashboardDeleteButton
	);

	return (
		<button onClick={onDelete} className={buttonClassName}>
			{/* <DeleteOutlineIcon className={style.deleteIcon} /> */}
			<DeleteOutlined className={style.deleteIcon} />
		</button>
	);
};

export default DeleteButton;
