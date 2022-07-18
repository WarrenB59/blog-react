import React from "react";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import { REGISTER_SCHEMA } from "../constants/apiYup.js";
import { isAuthenticated } from "./../services/accountService";
import Loading from "../components/Articles/loader/Loading.js";
import { register } from "../constants/apiConstants.js";


const Register = () => {
  const isLogged = isAuthenticated();

  function handleSubmit(values) {
    values.firstName = values.firstname;
    try {
      register(values).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return !isLogged ? (
    <div className="login">
      <Formik
        initialValues={{
          name: "",
          firstname: "",
          email: "",
          password: "",
          verifpassword: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={REGISTER_SCHEMA}
      >
        {({
          values,
          handleSubmit,
          isSubmitting,
          errors,
          handleChange,
          touched,
          handleBlur,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Nom"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              isInvalid={!!errors.name}
              isValid={touched.name && !errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              type="text"
              name="firstname"
              placeholder="Prénom"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstname}
              isInvalid={!!errors.firstname}
              isValid={touched.firstname && !errors.firstname}
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstname}
            </Form.Control.Feedback>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Adresse mail</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Enter votre adresse mail"
                isInvalid={!!errors.email}
                isValid={touched.email && !errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Nous ne divulguerons jamais votre email à qui que ce soit.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Mot de passe"
                isInvalid={!!errors.password}
                isValid={touched.password && !errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirmation du mot de passe</Form.Label>
              <Form.Control
                type="password"
                name="verifpassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.verifpassword}
                placeholder="confirmez votre mot de passe"
                isInvalid={!!errors.verifpassword}
                isValid={touched.verifpassword && !errors.verifpassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.verifpassword}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Envoyer
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  ) : (
    <Loading />
  );
};

export default Register;
