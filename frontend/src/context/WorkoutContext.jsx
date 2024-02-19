import PropTypes from "prop-types";
import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export const WorkoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUT": {
      return {
        workouts: action.payload,
      };
    }
    case "CREATE_WORKOUT": {
      return {
        workouts: [action.payload, ...state.workout],
      };
    }
    case "DELETE_WORKOUT": {
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
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
