import AddMeal1 from "../../containers/AddMealSteps/AddMeal1.jsx";
import AddMeal2 from "../../containers/AddMealSteps/AddMeal2.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddMeal = () => {
	const navigate = useNavigate();

	const [step, setStep] = useState(1);

	const handleNext = () => {
		setStep(2);
	};

	const handleAddMeal = () => {
		navigate("/");
		setStep(1);
	};

	return (
		<main className="connectedMain">
			{step === 1 && <AddMeal1 onClickNext={handleNext} />}
			{step === 2 && <AddMeal2 onClickAddMeal={handleAddMeal} />}
		</main>
	);
};

export default AddMeal;
