import React from 'react';
import {Route, Switch} from 'react-router';
import {SignIn, Home, Covid19Infection, Covid19Death, Covid19Total} from './templates';
import Auth from './templates/Auth'

const Router = () => {
  return (
    <Switch>
      <Route exact path="/signin" component={SignIn}/>
      <Auth>
        <Route exact path="(/)?" component={Home}/>
        <Route exact path="/Covid19Infection" component={Covid19Infection}/>
        <Route exact path="/Covid19Death" component={Covid19Death}/>
        <Route exact path="/Covid19Total" component={Covid19Total}/>
      </Auth>
    </Switch>
  );
};

export default Router;
