import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Formik } from 'formik';

import { authenticate } from '../constants/apiConstants';
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/user/authenticationAction';

import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../services/accountService.js';
import Loading from '../components/Articles/loader/Loading.js';
import { LOGIN_SCHEMA } from '../constants/apiYup';
import { getPayloadToken } from '../services/tokenService';

const Login = () => {

    const isLogged = isAuthenticated();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    function handleSubmit(values) {
        values.username = values.email;
        try {
            authenticate(values).then((res) => {
            dispatch(signIn(res.data.token));
            const user = getPayloadToken()
            sessionStorage.setItem("user", JSON.stringify(user))
            navigate(-1)
        })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        !isLogged ? (
        <Container>
            <div className='content'>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={handleSubmit}
                validationSchema={LOGIN_SCHEMA}
            >
            {({ values, handleSubmit, isSubmitting, errors, handleChange, touched, handleBlur }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder="Enter email"
                                isInvalid={!!errors.email}
                                isValid={touched.email && !errors.email}
                            />
                            <Form.Control.Feedback 
                                type="invalid">
                                    {errors.email}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Nous ne divulguerons jamais votre email à qui que ce soit.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                placeholder="Password"
                                isInvalid={!!errors.password}
                                isValid={touched.password && !errors.password}
                            />
                            <Form.Control.Feedback 
                                type="invalid">
                                    {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            Envoyer
                        </Button>
                    </Form>
                )}
            </Formik>
            </div>
        </Container>
        ):(
            <Loading />
        )
    );
};

export default Login;