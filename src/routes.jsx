import App from "./App";
import Dashboard from "./pages/Dashboard/Dashboard";
import History from "./pages/History/History";
import AddMeal from "./pages/AddMeal/AddMeal";
import Graphs from "./pages/Graphs/Graphs";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

const routes = [
	{
		path: "",
		element: <App />,
		children: [
			{
				index: true,
				element: <Dashboard />,
			},
			{
				path: "addMeal",
				element: <AddMeal />,
			},
			{
				path: "history",
				element: <History />,
			},
			{
				path: "graphs",
				element: <Graphs />,
			},
		],
	},
	{
		path: "login",
		element: <LoginPage />,
	},
	{
		path: "register",
		element: <RegisterPage />,
	},
];

export default routes;
