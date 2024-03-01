import PropTypes from "prop-types";
import React from "react";
import { get } from "lodash";
import { formatDistanceToNow } from "date-fns";
// UI Component
import {
  Flex,
  Box,
  IconButton,
  Text,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Tr,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
// Custom
import { deleteWorkout } from "../apis/WorkoutsAPIs";
import { useWorkoutsContext } from "../hooks/context/useWorkoutsContext";

const WorkoutDetailCard = (props) => {
  const { workout, ...rest } = props;
  const { dispatch } = useWorkoutsContext();

  const handleDelete = (id) => {
    deleteWorkout(id)
      .then((result) => {
        if (get(result, "status", 0) === 200) {
          dispatch({
            type: "DELETE_WORKOUT",
            payload: get(result, "data", {}),
          });
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <React.Fragment>
      <Card {...rest}>
        <CardBody>
          <Flex
            pl={2}
            spacing="4"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Heading size="md">{get(workout, "title", "")}</Heading>
            </Box>
            <IconButton
              variant="ghost"
              colorScheme="red"
              aria-label="See menu"
              icon={<DeleteIcon />}
              onClick={() => handleDelete(get(workout, "_id", ""))}
            />
          </Flex>

          <TableContainer>
            <Table variant="simple">
              <Tbody>
                <Tr>
                  <Th>Load (in KG)</Th>
                  <Td>{get(workout, "load", 0)}</Td>
                </Tr>
                <Tr>
                  <Th>Reps</Th>
                  <Td>{get(workout, "reps", 0)}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
        <Divider colorScheme="telegram" />
        <CardFooter>
          <Text fontSize="small" color="gray.700">
            {formatDistanceToNow(new Date(get(workout, "createdAt", "")), {
              addSuffix: true,
              includeSeconds: true,
            })}
          </Text>
        </CardFooter>
      </Card>
    </React.Fragment>
  );
};

WorkoutDetailCard.propTypes = {
  workout: PropTypes.object,
};

export default WorkoutDetailCard;
