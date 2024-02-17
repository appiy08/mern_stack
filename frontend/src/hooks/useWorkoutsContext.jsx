import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";

const useWorkoutsContext = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error(
      "useWorkoutsContext must be used inside a WorkoutContextProvider"
    );
  }
  
  return context;
};

useWorkoutsContext.propTypes = {};

export default useWorkoutsContext;
