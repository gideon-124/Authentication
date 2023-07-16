import { Box, Title, TextInput, Button, Flex, Anchor } from "@mantine/core";
import React from "react";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { apiForgotPassword } from "./services/Api";
interface FormValues {
  email: string;
}
const ForgetPassword = () => {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) =>
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        )
          ? null
          : "Invalid email",
    },
  });
  const handleFormSubmit = (values: FormValues) => {
    axios
      .put(apiForgotPassword, values)
      .then((res) => {
        navigate("/PasswordSuccess");
      })
      .catch((err) => {
        if (err.response.data.errorMessage)
          window.alert(err.response.data.errorMessage);
        else window.alert("Something went wrong..");
      });
  };
  return (
    <Box>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <Box
          style={{
            background: "#969696",
            padding: "172px, 470px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Flex
            w={500}
            h={600}
            bg={"#ffffff"}
            justify='center'
            align='center'
            direction='column'
            gap={24}>
            <Title order={3}> Forgot password </Title>

            <TextInput
              placeholder='Enter the email'
              label='Email'
              w={300}
              color='#969696'
              {...form.getInputProps("email")}
            />
            <Button w={300} bg={"#000000"} type='submit'>
              {" "}
              Reset password sent{" "}
            </Button>
            <Anchor href='/' size={12}>
              Back to Login
            </Anchor>
          </Flex>
        </Box>
      </form>
    </Box>
  );
};

export default ForgetPassword;
