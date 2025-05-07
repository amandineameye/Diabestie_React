import style from "./GreetingsAndDate.module.css";
import { useSelector } from "react-redux";

const GreetingsAndDate = () => {
	let greetings;
	const now = new Date();
	const options = { weekday: "long", day: "numeric", month: "long" };
	const date = now.toLocaleDateString("en-US", options);

	if (now.getHours() < 12) {
		greetings = "Good morning";
	} else if (now.getHours() < 18) {
		greetings = "Good afternoon";
	} else {
		greetings = "Good evening";
	}

	const firstName = useSelector(
		(state) => state.userData?.data?.firstName
	);

	return (
		<div className={style.greetingsAndDate}>
			{firstName ? <h1>
				{greetings}, <span>{firstName}</span>
			</h1> : <h1>{greetings}</h1>}
			
			<p>{date}</p>
		</div>
	);
};

export default GreetingsAndDate;
