import AuthHelper from "../../helpers/auth.helper";
import { UserEntity } from "../../api/user.api";
import { SignInResponse } from "../../api/auth.api";
import { CustomAction } from "../types";

export const AUTH_ACTIONS = {
  SIGN_IN: 'signIn',
  LOGOUT: 'logout',
};

type State = {
  accessToken: string;
  refreshToken: string;
  isAuthenticated: boolean;
  user: UserEntity | null;
}
const _getActualState = (helper: typeof AuthHelper): State => {
  const jwtTokens: SignInResponse = helper.getJwtTokens();
  return {
    ...jwtTokens,
    isAuthenticated: !!jwtTokens.accessToken,
    user: helper.getUser()
  };
};

const initialState: State = _getActualState(AuthHelper);

export default function authReducer(state: State = initialState, action: CustomAction): State {
  if (action.type === AUTH_ACTIONS.SIGN_IN) {
    return {
      ...state,
      ...action.payload as SignInResponse
    };
  }
  if (action.type === AUTH_ACTIONS.LOGOUT) {
    return _getActualState(AuthHelper);
  }

  return state;
}