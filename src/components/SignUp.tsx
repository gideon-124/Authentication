import React, { useState } from "react";
import axios from "axios";
import {
  TextInput,
  Button,
  Box,
  PasswordInput,
  Textarea,
  Title,
  Flex,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { apiRegister } from "./services/Api";

const SignUp = () => {
  const navigate = useNavigate();
  interface FormValues {
    email: string;
    password: string;
    name: string;
    phone: string;
    address: string;
  }
  const form = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
      address: "",
    },

    validate: {
      email: (value) =>
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        )
          ? null
          : "Invalid email",
      password: (value) =>
        /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()-__+.]){1,}).{8,}$/.test(
          value
        )
          ? null
          : "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.",
      name: (value) => (value.trim() !== "" ? null : "Name is required."),
      phone: (value) =>
        /^[0-9]{10}/.test(value) ? null : "Invalid phone number",
      address: (value) => (value.trim() !== "" ? null : "Address is required."),
    },
  });
  const handleFormSubmit = (values: FormValues) => {
    axios
      .post(apiRegister, values)
      .then((res) => {
        navigate("/");
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
            <Title order={3}> Sign Up</Title>
            <TextInput
              placeholder='Enter the email'
              label='Email'
              w={300}
              color='#969696'
              {...form.getInputProps("email")}
            />

            <PasswordInput
              placeholder='Password'
              label='Password'
              w={300}
              color='#969696'
              {...form.getInputProps("password")}
            />

            <TextInput
              placeholder='Your name'
              label='Full name'
              w={300}
              color='#969696'
              {...form.getInputProps("name")}
            />

            <TextInput
              label='phone number'
              placeholder='number'
              maxLength={10}
              w={300}
              color='#969696'
              {...form.getInputProps("phone")}
            />

            <Textarea
              placeholder='Enter Your Address'
              label='Address'
              w={300}
              color='#969696'
              {...form.getInputProps("address")}
            />
            <Button w={300} bg={"#000000"} type='submit'>
              {" "}
              Login{" "}
            </Button>
          </Flex>
        </Box>
      </form>
    </Box>
  );
};

export default SignUp;
