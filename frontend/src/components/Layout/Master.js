import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Container } from 'reactstrap';

import Header from './Header';

export default function Master({children}) {
  return (
    <>
      <Header />
      <Container fluid>{children}</Container>
      <ToastContainer />
    </>
  );
}