import React from 'react';
import styled from '@emotion/styled';
import { FaExclamationTriangle } from 'react-icons/fa';

import Layout from '../components/Layout/Master';

export default function NotFound() {
  return (
    <Layout>
      <NotFoundStyled>
        <h1 className='x-large text-warning'>
          <FaExclamationTriangle /> Page Not Found
        </h1>
        <p className='large'>Sorry, this page does not exist</p>
      </NotFoundStyled>
    </Layout>
  );
}

const NotFoundStyled = styled.div`
  max-width: 500px;
  margin: 60px auto 0 auto;
  border: 1px solid #dedede;
  padding: 20px;

  h1 {
    display: flex;
    justify-content: center;

    svg {
      margin-right: 10px;
    }
  }

  p {
    text-align: center;
  }
`;