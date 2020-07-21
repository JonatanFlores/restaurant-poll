import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import GuestRoute from './components/Routing/GuestRoute';
import NotFound from './pages/NotFound';
import Restaurants from './pages/Restaurants';
import Login from './pages/Login';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Restaurants} />
        <GuestRoute exact path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}