/** @format */

import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import * as yup from "yup";
import Toast from "react-native-root-toast";
import { registerApi } from "../../api/user";
import { formStyle } from "../../styles";
import axios from "axios";
import axiosClient from "../../config/axios";

export default function RegisterForm(props) {
  const { changeForm } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        const { data } = await axiosClient.post("/users/register", formData);
        console.log(data);
        Toast.show(data.msg, {
          position: Toast.positions.CENTER,
        });
        changeForm();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setLoading(false);
          Toast.show(error.response?.data.msg, {
            position: Toast.positions.CENTER,
          });
        }
      }
    },
  });

  return (
    <View>
      <TextInput
        label='Nombre'
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        value={formik.values.name}
        error={formik.errors.name}
      />

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

      <TextInput
        label='Repetir contraseña'
        style={formStyle.input}
        secureTextEntry
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        value={formik.values.repeatPassword}
        error={formik.errors.repeatPassword}
      />

      <Button
        mode='contained'
        style={formStyle.btnSuccess}
        onPress={formik.handleSubmit}
        loading={loading}>
        {!loading && "Registrarse"}
      </Button>

      <Button
        mode='text'
        style={formStyle.btnText}
        labelStyle={formStyle.btnTextLabel}
        onPress={changeForm}>
        Iniciar Sesion
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    email: "",
    name: "",
    password: "",
    repeatPassword: "",
  };
}

function validationSchema() {
  return {
    email: yup.string().email(true).required(true),
    name: yup.string().required(true),
    password: yup.string().required(true),
    repeatPassword: yup
      .string()
      .required(true)
      .oneOf([yup.ref("password")], true),
  };
}
