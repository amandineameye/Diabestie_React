import style from "./DeleteButton.module.css";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DeleteOutlined, DeleteFilled } from "@ant-design/icons";
import deleteIcon from "../../assets/delete.png";

const DeleteButton = ({ onDelete = () => {} }) => {
	const pathname = useLocation().pathname;

	const buttonClassName = clsx(
		style.deleteButton,
		pathname === "/" && style.dashboardDeleteButton
	);

	return (
		<button onClick={onDelete} className={buttonClassName}>
			{/* <DeleteOutlineIcon className={style.deleteIcon} /> */}
			{/* <DeleteOutlined className={style.deleteIcon} /> */}
			<img src={deleteIcon} alt="delete" />
		</button>
	);
};

export default DeleteButton;
