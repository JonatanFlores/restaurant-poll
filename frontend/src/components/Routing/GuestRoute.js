import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function GuestRoute({ component: Component, ...rest }) {
  const { isAuthenticated, loading } = useSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={function (props) {
        return !isAuthenticated && !loading ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }}
    />
  );
}