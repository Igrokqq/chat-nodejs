import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function RedirectIfUnauthenticated({
  component,
  render,
  isAuthenticated,
  redirectTo,
  ...rest
}: any): any {
  if (!isAuthenticated) {
    return <Redirect to={{ pathname: redirectTo }} />;
  }

  return <Route {...rest} render={component || render} />;
}