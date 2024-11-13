import AddMeal1 from "../../containers/AddMealSteps/AddMeal1.jsx";
import AddMeal2 from "../../containers/AddMealSteps/AddMeal2.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddMeal = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    setStep(2);
  };

  const handleAddMeal = () => {
    navigate("/");
    setStep(1);
  };

  return (
    <main>
      {step === 1 && <AddMeal1 onClickNext={handleNext} />}
      {step === 2 && <AddMeal2 onClickAddMeal={handleAddMeal} />}
    </main>
  );
};

export default AddMeal;
