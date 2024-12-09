import "./App.css";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBar from "./containers/NavBar/NavBar";
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
