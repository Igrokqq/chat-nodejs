import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Home from '../../pages/home';
import SignUp from '../../pages/signUp';
import SignIn from '../../pages/signIn';
import NotFound from '../../pages/notFound';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App(): JSX.Element {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/signup" component={SignUp} exact={true} />
            <Route path="/signin" component={SignIn} exact={true} />
            <Route path="/404" component={NotFound} exact={true} />
            <Redirect to="/404" />
          </Switch>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
