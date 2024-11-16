import App from "./App";
import Dashboard from "./pages/Dashboard/Dashboard";
import History from "./pages/History/History";
import AddMeal from "./pages/AddMeal/AddMeal";
import LoginPage from "./pages/LoginPage/LoginPage";

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
				path: "login",
				element: <LoginPage />,
			},
		],
	},
];

export default routes;
