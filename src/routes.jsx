import App from "./App";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddMeal1 from "./pages/AddMeal1/AddMeal1";
import AddMeal2 from "./pages/AddMeal2/AddMeal2";
import History from "./pages/History/History";

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
				path: "addMeal/step1",
				element: <AddMeal1 />,
			},
			{
				path: "addMeal/step2",
				element: <AddMeal2 />,
			},
			{
				path: "history",
				element: <History />,
			},
		],
	},
];

export default routes;
