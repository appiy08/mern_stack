import PropTypes from "prop-types";
import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export const WorkoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUT": {
      return {
        workout: action.payload,
      };
    }
    case "CREATE_WORKOUT": {
      return {
        workout: [action.payload, ...state.workout],
      };
    }
    default: {
      return state;
    }
  }
};

const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(WorkoutReducer, {
    workouts: null,
  });

  return (
    <WorkoutContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};

WorkoutContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WorkoutContextProvider;
