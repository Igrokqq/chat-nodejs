import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Home from '../../pages/home';
import SignUp from '../../pages/signUp';
import SignIn from '../../pages/signIn';
import NotFound from '../../pages/notFound';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ComponentReduxProps } from '../../redux/types';
import RedirectIfAuthenticated from '../../routes/redirect-if-authenticated';
import RedirectIfUnauthenticated from '../../routes/redirect-if-unauthenticated';
import routes from "./routes";
import io from "socket.io-client";
import config from '../../config';
import Chat from '../../pages/chat';

const socket = (io as any)(config.api.socketIo.baseUrl);
const queryClient = new QueryClient()

function App(props: ComponentReduxProps): JSX.Element {
  const { isAuthenticated } = props.store.getState().authReducer;

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Switch>
            <RedirectIfUnauthenticated
              redirectTo={routes.SIGN_IN}
              path={routes.HOME}
              render={() => <Home socket={socket}/>}
              isAuthenticated={isAuthenticated}
              exact={true}
            />
            <RedirectIfUnauthenticated
              redirectTo={routes.SIGN_IN}
              path={routes.CHAT}
              render={() => <Chat socket={socket}/>}
              isAuthenticated={isAuthenticated}
              exact={true}
            />
            <RedirectIfAuthenticated
              redirectTo={routes.HOME}
              path={routes.SIGN_IN}
              isAuthenticated={isAuthenticated}
              render={() => <SignIn {...props}/>}
              exact={true}
              socket={socket}
            />
            <RedirectIfAuthenticated
              redirectTo={routes.HOME}
              path={routes.SIGN_UP}
              isAuthenticated={isAuthenticated}
              render={() => <SignUp />}
              exact={true}
            />
            <Route path={routes.NOT_FOUND} component={NotFound} exact={true} />
            <Redirect to={routes.NOT_FOUND} />
          </Switch>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
