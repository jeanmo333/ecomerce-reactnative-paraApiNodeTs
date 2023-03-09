/** @format */

import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import * as yup from "yup";
import Toast from "react-native-root-toast";
import useAuth from "../../hooks/useAuth";
import { formStyle } from "../../styles";
import { loginApi } from "../../api/user";
import axios from "axios";
import axiosClient from "../../config/axios";

export default function LoginForm(props) {
  const { changeForm } = props;
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        const { data } = await axiosClient.post("/users/login", formData);
        login(data);
        Toast.show("Login exitoso", {
          position: Toast.positions.CENTER,
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setLoading(false);
          if (axios.isAxiosError(error)) {
            Toast.show(error.response?.data.msg, {
              position: Toast.positions.CENTER,
            });
          }
        }
      }
      // try {
      //   const response = await loginApi(formData);
      //   if (response.statusCode) throw "usuario o Contraseña incorrecto";
      //   login(response);
      // } catch (error) {
      //   Toast.show(error, {
      //     position: Toast.positions.CENTER,
      //   });

      //   setLoading(false);
      // }
    },
  });
  return (
    <View>
      <View>
        {/* <TextInput
          label='Email o Username'
          style={formStyle.input}
          onChangeText={(text) => formik.setFieldValue("identifier", text)}
          value={formik.values.identifier}
          error={formik.errors.identifier}
        /> */}

        <TextInput
          label='Email'
          style={formStyle.input}
          onChangeText={(text) => formik.setFieldValue("email", text)}
          value={formik.values.email}
          error={formik.errors.email}
        />

        <TextInput
          label='Contraseña'
          style={formStyle.input}
          secureTextEntry
          onChangeText={(text) => formik.setFieldValue("password", text)}
          value={formik.values.password}
          error={formik.errors.password}
        />

        <Button
          mode='contained'
          style={formStyle.btnSuccess}
          onPress={formik.handleSubmit}
          loading={loading}>
          {!loading && "Ingresar"}
        </Button>

        <Button
          mode='text'
          style={formStyle.btnText}
          labelStyle={formStyle.btnTextLabel}
          onPress={changeForm}>
          Registrarse
        </Button>
      </View>
    </View>
  );
}

function initialValues() {
  return {
    // identifier: "",
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    // identifier: yup.string().required(true),
    email: yup.string().email(true).required(true),
    password: yup.string().required(true),
  };
}
