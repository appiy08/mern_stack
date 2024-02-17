import PropTypes from "prop-types";
import React from "react";
// UI Component
import {
  Button,
  ButtonGroup,
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
  Tr
} from "@chakra-ui/react";
import { get } from "lodash";

const WorkoutCard = (props) => {
  const { workout, ...rest } = props;

  return (
    <React.Fragment>
      <Card {...rest}>
        <CardBody>
          <Heading size="md">{get(workout, "title", "")}</Heading>
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
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Buy now
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </React.Fragment>
  );
};

WorkoutCard.propTypes = {
  workout: PropTypes.object,
};

export default WorkoutCard;
