
import * as AuthApi from '../api/auth.api';
import * as UserApi from "../api/user.api";
import { SignUpFieldsData } from '../components/v1/signUpForm/types';
import { UserEntity } from '../api/user.api';
import { SignInFieldsData } from '../components/v1/signInForm/types';
import UserHelper from './user.helper';
import { SignInResponse } from '../api/auth.api';
import * as LocalStorage from "../common/localStorage";

const _setJwtTokensInLocalStorage = (jwtTokens: SignInResponse): void => {
  LocalStorage.setItem("user:tokens", jwtTokens);
}
const _getJwtTokensFromLocalStorage = (): SignInResponse | null => {
  return LocalStorage.getItem("user:tokens");
}
const _getUserFromLocalStorage = (): UserEntity | null => {
  return LocalStorage.getItem("user");
}
const AuthHelper =  {
  getJwtAccessToken(): string | null {
    const tokens: SignInResponse | null = _getJwtTokensFromLocalStorage();

    if (tokens) {
      return tokens.accessToken;
    }

    return null;
  },
  getJwtTokens(): SignInResponse {
    const tokens: SignInResponse | null = _getJwtTokensFromLocalStorage();

    return tokens ? {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    } : {
      accessToken: "",
      refreshToken: "",
    }
  },
  getUser(): UserEntity | null {
    return _getUserFromLocalStorage();
  },
  async logout(logoutPayload: AuthApi.LogoutPayload): Promise<void> {
    await AuthApi.logout(logoutPayload);
  },
  async signUp(user: SignUpFieldsData): Promise<void> {
    await UserApi.signUp(user);
  },
  async signIn(signInFields: SignInFieldsData): Promise<SignInResponse> {
    const jwtTokens: SignInResponse = await AuthApi.signIn(signInFields);
    const user: UserEntity = await AuthApi.getUserByAccessToken(jwtTokens.accessToken);

    UserHelper.setUserInLocalStorage(user);
    _setJwtTokensInLocalStorage(jwtTokens)

    return jwtTokens;
  }
};

export default AuthHelper;