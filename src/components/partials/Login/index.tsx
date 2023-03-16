import React, { useState, useEffect, ReactElement, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup'; // RulesValidation
import { Formik, FormikHelpers, ErrorMessage } from 'formik'; // FormValidation
import { toast } from 'react-toastify';
import { Button, Row, Col, Form, Container } from 'react-bootstrap';

import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { loginRequest, loginOut, selectAuth } from '../../../store/slices/auth.slice';
import { AppDispatch } from '../../../store';

// import Loading from '../../components/shareds/Loading';

type FormValues = {
  email: string;
  password: string;
};

const emptyValues: FormValues = {
  email: '',
  password: '',
};

const schema = yup.object().shape({
  email: yup.string().email().required('Favor, informe seu e-mail para prosseguir'),
  password: yup.string().required('Favor, informe sua senha para prosseguir'),
});

const LoginForm = (): ReactElement => {
  const [initialValues, setInitialValues] = useState<FormValues>(emptyValues);

  const dispatch: AppDispatch = useAppDispatch();
  const session = useAppSelector(selectAuth);

  const navigate = useNavigate();

  const handleSetImportedValues = useCallback(() => {
    setInitialValues(emptyValues);
  }, []);

  useEffect(() => {
    handleSetImportedValues();
  }, [handleSetImportedValues]);

  const onSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    try {
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email: values.email,
      //   password: values.password,
      // });

      const response = await dispatch(loginRequest(values));

      console.log('login', response);

      if (response.meta.requestStatus === 'fulfilled') {
        toast.success('Login realizado');
        navigate('/');
      } else {
        toast.error('Credenciais inválidas');
      }

      console.log(`Bem vindo FULANO`);
    } catch (err) {
      console.log(err);
    }
  };

  const onReset = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    console.log('reset', values, actions);
    console.log(initialValues);
  };

  return (
    <Container>
      <Row className="p-2 d-flex justify-content-center align-items-center">
        <Col xs={12} md={6} lg={4} className="bg-light border rounded">
          <Row>
            <Col xs={12} className="py-2 text-center">
              <span className="fs-5">LOGIN</span>
            </Col>
          </Row>
          <Row>
            <Formik // FORAM DEFINIFOS 2 FORMULÁRIOS POIS O SEGUNDO SÓ VAI APARECER AOÓS A INSERÇÃO DO PRIMEIRO
              initialValues={initialValues}
              validationSchema={schema}
              onSubmit={onSubmit}
              onReset={onReset}
            >
              {({
                handleSubmit,
                handleChange,
                handleReset,
                handleBlur,
                values,
                // isSubmitting,
                // touched,
                // errors,
                // setFieldValue,
                // setFieldTouched,
              }) => (
                <Form noValidate autoComplete="on" onSubmit={handleSubmit}>
                  <Row>
                    <Form.Group as={Col} xs={12} controlId="email" className="pb-3">
                      <Form.Label>E-mail</Form.Label>
                      <Form.Control
                        type="tel"
                        value={values.email}
                        onChange={handleChange}
                        autoFocus
                        placeholder="Informe seu melhor e-mail"
                        onBlur={handleBlur}
                      />
                      <ErrorMessage name="email">
                        {(msg) => (
                          <span className="text-danger" style={{ fontSize: '.7em' }}>
                            {msg}
                          </span>
                        )}
                      </ErrorMessage>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} xs={12} controlId="password" className="pb-3">
                      <Form.Label>Senha</Form.Label>
                      <Form.Control
                        type="text"
                        value={values.password}
                        onChange={handleChange}
                        placeholder="Informe sua senha"
                        onBlur={handleBlur}
                      />
                      <ErrorMessage name="password">
                        {(msg) => (
                          <span className="text-danger" style={{ fontSize: '.7em' }}>
                            {msg}
                          </span>
                        )}
                      </ErrorMessage>
                    </Form.Group>
                  </Row>
                  <Row className="justify-content-center">
                    <Col xs="auto" className="text-center pt-2 pb-4">
                      <Button
                        type="submit"
                        variant="outline-success"
                        onClick={
                          handleSubmit as unknown as React.MouseEventHandler<HTMLButtonElement>
                        }
                      >
                        Entrar
                      </Button>
                    </Col>
                    <Col xs="auto" className="text-center pt-2 pb-4">
                      <Button
                        variant="outline-danger"
                        onClick={(e) => {
                          console.log('sair');
                          dispatch(loginOut() as unknown as AnyAction);
                        }}
                      >
                        Sair
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
