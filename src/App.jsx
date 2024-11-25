import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./containers/NavBar/NavBar-v2";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserNames } from "./store/usersData/usersData.action";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserNames());
	}, [dispatch]);

	return (
		<>
			<NavBar />
			<Outlet />
		</>
	);
}

export default App;
