import React from "react";
// UI Component
import { Box } from "@chakra-ui/react";
// Component
import WorkoutForm from "../components/forms/WorkoutForm";

const WorkoutCreate = () => {
  return (
    <React.Fragment>
      <Box w={{ md: "50%" }} p={4}>
        <WorkoutForm />
      </Box>
    </React.Fragment>
  );
};

export default WorkoutCreate;
