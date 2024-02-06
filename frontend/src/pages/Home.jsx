import React from "react";
// UI Component
import { Container, Box } from "@chakra-ui/react";

const Home = () => {
  return (
    <React.Fragment>
      <Container>
        <Box bg="tomato" w="100%" p={4} color="white">
          This is the Box
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Home;
