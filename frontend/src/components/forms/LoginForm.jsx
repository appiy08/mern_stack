import { useState } from "react";
// UI Component
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
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
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
// Form
import { Field, Form, Formik } from "formik";
import { get } from "lodash";
import * as Yup from "yup";
// Custom
import { userLogin } from "../../apis/AuthAPIs";
import useAuthContext from "../../hooks/useAuthContext";

const LoginForm = () => {
  const { dispatch } = useAuthContext();
  const [formSubmitResult, setFormSubmitResult] = useState({
    type: "",
    msg: "",
  });
  const [passwordFieldType, setPasswordFieldType] = useState("password");

  const togglePasswordShowHide = () => {
    if (passwordFieldType === "password") {
      setPasswordFieldType("text");
    } else {
      setPasswordFieldType("password");
    }
  };

  const onClose = () => {
    setFormSubmitResult({ type: "" });
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Too Short!")
      .max(30, "Too Long!")
      .required("Password is required"),
  });

  const handleSubmit = (values, actions) => {
    userLogin(values).then((result) => {
      actions.setSubmitting(false);
      if (get(result, "status", 0) === 200) {
        setFormSubmitResult({
          type: "success",
          msg: get(result, "message", "success"),
        });
        dispatch({ type: "LOGIN", payload: get(result, "data", null) });
      } else {
        setFormSubmitResult({
          type: "error",
          msg: get(result, "data.error", "error"),
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Login</Heading>
      </CardHeader>
      <Divider colorScheme="blackAlpha" />
      <CardBody>
        {get(formSubmitResult, "type", "") !== "" ? (
          <Alert status={get(formSubmitResult, "type", "info")} m={2}>
            <AlertIcon />
            <Box>
              <AlertTitle textTransform="capitalize">
                {get(formSubmitResult, "type", "info")}
              </AlertTitle>
              <AlertDescription>
                {get(formSubmitResult, "msg", "Form submitted successfully!")}
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
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values, actions) => {
            handleSubmit(values, actions);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack direction="column" gap={4}>
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel>Email</FormLabel>
                      <Input {...field} type="email" placeholder="Email" />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          {...field}
                          type={passwordFieldType}
                          placeholder="Password"
                        />
                        <InputRightElement>
                          <IconButton
                            onClick={togglePasswordShowHide}
                            aria-label="Search database"
                            icon={
                              passwordFieldType === "password" ? (
                                <ViewIcon />
                              ) : (
                                <ViewOffIcon />
                              )
                            }
                          />
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Stack>
              <Box pt={8} pb={4}>
                <Button
                  type="submit"
                  width="100%"
                  isLoading={isSubmitting}
                  loadingText="Loading"
                  colorScheme="teal"
                  spinnerPlacement="start"
                >
                  Login
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
