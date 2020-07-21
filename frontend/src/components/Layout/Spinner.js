import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Spinner({ loading = false }) {
  return (
    <Container className={loading ? 'show' : 'hide'}>
      <ClipLoader css={override} color="#1e9379" loading={loading} />
    </Container>
  );
}

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  width: 80px;
  height: 80px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(7, 49, 66, 0.3);
  position: absolute;
  top: 0;
  left: 0;

  &.show {
    display: flex;
  }

  &.hide {
    display: none;
  }
`;