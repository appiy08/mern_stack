import { get, isEmpty, map } from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// UI Component
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Stack,
  Flex,
  Spinner,
} from "@chakra-ui/react";
// APIs
import { getWorkouts } from "../apis/WorkoutsAPIs";
import WorkoutCard from "../components/WorkoutDetailCard";
import useWorkoutsContext from "../hooks/useWorkoutsContext";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    setLoading(true);
    getWorkouts()
      .then((result) => {
        if (get(result, "status", 0) === 200) {
          dispatch({
            type: "SET_WORKOUT",
            payload: get(result, "data", null),
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        throw err;
      });

    return () => {};
  }, [dispatch]);

  return (
    <React.Fragment>
      <Box w="100%" p={4}>
        <Box p={4}>
          <Stack
            direction={["column", "row"]}
            spacing={4}
            justifyContent="space-between"
          >
            <Box>
              <Heading as="h5">Home</Heading>
            </Box>
            <Box>
              <Button
                colorScheme="green"
                variant="solid"
                onClick={() => navigate("workout-create")}
              >
                Workout Create
              </Button>
            </Box>
          </Stack>
        </Box>
        {!loading ? (
          !isEmpty(workouts) ? (
            <Grid
              templateColumns={{
                lg: "repeat(4, 1fr)",
                md: "repeat(3,1fr)",
                sm: "repeat(2,1fr)",
              }}
              gap={6}
            >
              {!isEmpty(workouts) &&
                map(workouts, (data, idx) => {
                  return (
                    <GridItem w="100%" key={idx}>
                      <WorkoutCard workout={data} />
                    </GridItem>
                  );
                })}
            </Grid>
          ) : (
            <Box p={4}>
              <Heading as="h3" size="lg" color="gray.500">
                No Workouts found!!!
              </Heading>
            </Box>
          )
        ) : (
          <Flex alignItems="center" justifyContent="center">
            <Box>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Box>
          </Flex>
        )}
      </Box>
    </React.Fragment>
  );
};

export default Home;
