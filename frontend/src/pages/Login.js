import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FaKey, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';

import Layout from '../components/Layout/Master';
import { login } from '../actions/auth';

export default function Login() {
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.auth);

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  }, [error]);

  const { email, password } = values;

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    dispatch(login(email, password));
  }

  return (
    <Layout>
      <LoginStyled>
        <h3 className="d-flex align-items-baseline justify-content-center mb-3">
          <FaLock /> <span className="ml-2">Acessar Minha Conta</span>
        </h3>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="text"
              name="email"
              id="email"
              onChange={handleChange}
              value={email}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              value={password}
            />
          </FormGroup>
          <Button type="submit" color="primary">
            <FaKey /> Sign In
          </Button>
        </Form>
      </LoginStyled>
    </Layout>
  );
}

const LoginStyled = styled.div`
  max-width: 400px;
  margin: 60px auto 0 auto;
`;