import {
  Box,
  Title,
  TextInput,
  Button,
  Flex,
  Anchor,
  PasswordInput,
} from "@mantine/core";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { ApiContext, PostApiContext } from "./ApiProvider";
import { apiLogin, apiRefreshToken } from "./services/Api";

interface FormValues {
  email: string;
  password: string;
}

const Form = () => {
  const [token, setToken] = useState<any>(null);
  const [refreshToken, setRefreshToken] = useState<any>("");
  // const { isPostApiSuccess } = useContext(ApiContext);
  const { setPutApiSuccess } = useContext(ApiContext);
  const { setPostApiSuccess } = useContext(PostApiContext);
  const { isPostApiSuccess } = useContext(PostApiContext);

  const navigate = useNavigate();
  const form = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
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
      .put(apiLogin, values)
      .then((res) => {
        setPutApiSuccess(true);
        setPostApiSuccess(true);
        const tokenData = {
          refreshToken: res?.data?.refreshToken,
        };
        axios
          .post(apiRefreshToken, tokenData)
          .then((res) => {
            localStorage.setItem(
              "accessToken",
              JSON.stringify(res?.data?.accessToken)
            );
            navigate("/table");
          })
          .catch((err) => {
            if (err.response.data.errorMessage)
              window.alert(err.response.data.errorMessage);
            else window.alert("Something went wrong..");
          });
      })
      .catch((err) => {
        if (err.response.data.errorMessage)
          window.alert(err.response.data.errorMessage);
        else window.alert("Something went wrong..");
      });
  };

  return (
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
          <Title order={3}> Login </Title>
          <TextInput
            placeholder='Enter the email'
            label='Email'
            w={300}
            color='#969696'
            {...form.getInputProps("email")}
          />
          <PasswordInput
            placeholder='Enter the password'
            label='Password'
            w={300}
            color='#969696'
            {...form.getInputProps("password")}
          />
          <Anchor href='/forgotpassword' size={12}>
            Forgot Password
          </Anchor>
          <Button w={300} bg={"#000000"} type='submit'>
            {" "}
            Login{" "}
          </Button>
        </Flex>
      </Box>
    </form>
  );
};

export default Form;
