import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL + '/dashboard';

const putTokenInHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
};

export const fetchNote = async () => {
  try {
    const headers = putTokenInHeaders();
    const response = await axios.get(apiURL + '/getNote', headers);
    return response.data.note;
  } catch (error) {
    console.log(error);
  }
};

export const patchNote = async (note) => {
  try {
    const headers = putTokenInHeaders();
    const response = await axios.patch(
      apiURL + '/updateNote',
      { updatedNote: note },
      headers
    );
    console.log(response.data.message);
  } catch (error) {
    console.log(error);
  }
};

export const fetchMealsSummary = async () => {
  try {
    const headers = putTokenInHeaders();
    const response = await axios.get(apiURL + '/getMealsSummary', headers);
    return response.data.meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchIncompleteMeals = async () => {
  try {
    const headers = putTokenInHeaders();
    const response = await axios.get(apiURL + '/getIncompleteMeals', headers);
    return response.data.meals;
  } catch (error) {
    console.log(error);
  }
};

export const patchIncompleteMeals = async (
  mealId,
  bloodSugarAfter,
  wasActiveAfter
) => {
  try {
    const headers = putTokenInHeaders();
    console.log(headers);
    const response = await axios.patch(
      apiURL + '/updateIncompleteMeal',
      { mealId, bloodSugarAfter, wasActiveAfter },
      headers
    );
    console.log(response.data.message);
  } catch (error) {
    console.log(error);
  }
};
