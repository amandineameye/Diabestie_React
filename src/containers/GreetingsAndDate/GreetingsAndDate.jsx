import style from "./GreetingsAndDate.module.css";

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

	console.log(now.getHours());
	return (
		<div className={style.greetingsAndDate}>
			<h1>
				{greetings}, <span>Amandine</span>
			</h1>
			<p>{date}</p>
		</div>
	);
};

export default GreetingsAndDate;
