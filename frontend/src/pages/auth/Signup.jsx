import React from "react";
// UI Component
import { Box, Flex } from "@chakra-ui/react";
// Component
import SignupForm from "../../components/forms/SignupForm";

const Signup = () => {
  return (
    <React.Fragment>
      <Box p={8}>
        <Flex minWidth="max-content" justifyContent="center">
          <Box minW="sm">
            <SignupForm />
          </Box>
        </Flex>
      </Box>
    </React.Fragment>
  );
};

export default Signup;
