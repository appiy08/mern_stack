import { useState } from "react";
import { get } from "lodash";
// UI Component
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  CloseButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
// Form
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { createWorkout } from "../apis/WorkoutsAPIs";

const WorkoutForm = () => {
  const [formSubmitAction, setFormSubmitAction] = useState("");

  const { onClose } = useDisclosure({ defaultIsOpen: true });

  const workoutSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Title is required"),
    load: Yup.number()
      .moreThan(-1, "Enter positive value!")
      .required("Load is required"),
    reps: Yup.number()
      .moreThan(-1, "Enter positive value!")
      .required("Reps is required"),
  });

  const handleSubmit = (values, actions) => {
    createWorkout(values)
      .then((result) => {
        console.log("result", result);
        if (get(result, "status", 0) === 200) {
          actions.setSubmitting(false);
          setFormSubmitAction("success");
        }
      })
      .catch((err) => {
        setFormSubmitAction("error");
        throw err;
      });
  };

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Create Workout</Heading>
      </CardHeader>
      <CardBody>
        {formSubmitAction === "success" ? (
          <Alert status="success" m={2}>
            <AlertIcon />
            <Box>
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>Form submitted successfully!</AlertDescription>
            </Box>
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={onClose}
            />
          </Alert>
        ) : formSubmitAction === "error" ? (
          <Alert status="error" m={2}>
            <AlertIcon />
            <Box>
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>
                Form not submitted successfully!
              </AlertDescription>
            </Box>
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={onClose}
            />
          </Alert>
        ) : (
          <></>
        )}
        <Formik
          initialValues={{ title: "", load: 0, reps: 0 }}
          validationSchema={workoutSchema}
          onSubmit={(values, actions) => {
            handleSubmit(values, actions);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack direction="column" gap={4}>
                <Field name="title">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.title && form.touched.title}
                    >
                      <FormLabel>Title</FormLabel>
                      <Input {...field} type="text" placeholder="Title" />
                      <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="load">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.load && form.touched.load}
                    >
                      <FormLabel>Load (in KG)</FormLabel>
                      <Input {...field} type="number" placeholder="Load" />
                      <FormErrorMessage>{form.errors.load}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="reps">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.reps && form.touched.reps}
                    >
                      <FormLabel>Reps</FormLabel>
                      <Input {...field} type="number" placeholder="Reps" />
                      <FormErrorMessage>{form.errors.reps}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Stack>
              <Button
                mt={6}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

WorkoutForm.propTypes = {};

export default WorkoutForm;
