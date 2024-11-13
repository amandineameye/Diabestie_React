import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./containers/NavBar/NavBar-v2";

function App() {
	return (
		<>
			<NavBar />
			<Outlet />
		</>
	);
}

export default App;
