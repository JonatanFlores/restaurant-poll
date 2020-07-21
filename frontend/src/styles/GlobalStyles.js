import React from 'react';
import { Global, css } from '@emotion/core';

export default function GlobalStyles() {
  return (
    <>
      <Global
        styles={css`
          html,
          body,
          #root {
            height: 100%;
          }

          body {
            color: #333;
            font-family: 'Roboto', sans-serif;
          }

          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }

          :root {
            --primary: #000;
            --secondary: #15181c;
            --white: #d9d9d9;
            --gray: #7a7a7a;
          }

          .navbar-brand {
            font-size: 2rem;
          }
          .nav-link {
            &.active {
              color: #333;
            }
          }
        `}
      />
    </>
  );
}
