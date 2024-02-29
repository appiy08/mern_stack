import React from "react";
// UI Component
import { Box, Flex } from "@chakra-ui/react";
// Component
import LoginForm from "../../components/forms/LoginForm";

const Login = () => {
  return (
    <React.Fragment>
      <Box p={8}>
        <Flex minWidth="max-content" justifyContent="center">
          <Box minW="sm">
            <LoginForm />
          </Box>
        </Flex>
      </Box>
    </React.Fragment>
  );
};

export default Login;
