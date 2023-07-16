import React from "react";
import {
  TextInput,
  Button,
  Box,
  Title,
  Flex,
  Anchor,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { apiResetPassword } from "./services/Api";

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}
const ResetPassword = () => {
  const { value } = useParams();
  const navigate = useNavigate();
  const form = useForm<ResetPasswordFormValues>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      password: (value) => (/^\S+@\S+$/.test(value) ? null : "Enter password"),
      confirmPassword: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Enter Confirm password",
    },
  });

  const handleSubmit = (values: ResetPasswordFormValues) => {
    const resetBody = {
      tokenId: value,
      password: values.confirmPassword,
    };

    axios
      .put(apiResetPassword, resetBody)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.info(err);
        if (err.response.data.errorMessage)
          window.alert(err.response.data.errorMessage);
        else window.alert("Something went wrong..");
      });
  };

  return (
    <Box>
      <form onSubmit={form.onSubmit(handleSubmit)}>
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
            <Title order={2}>Reset Password</Title>
            <TextInput
              placeholder='Enter the password'
              label='New password'
              w={300}
              color='#969696'
              {...form.getInputProps("password")}
            />

            <TextInput
              placeholder='Re-enter the password'
              label='Confirm password'
              w={300}
              color='#969696'
              {...form.getInputProps("confirmPassword")}
            />

            <Button w={300} bg='#000000' type='submit'>
              Change Password
            </Button>
          </Flex>
        </Box>
      </form>
    </Box>
  );
};

export default ResetPassword;
