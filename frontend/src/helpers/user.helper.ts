import * as UserApi from '../api/user.api';
import * as LocalStorage from "../common/localStorage";

const _setUserInLocalStorage = (user: UserApi.UserEntity): void => {
  LocalStorage.setItem('user', user || {});
};
const _removeUserInLocalStorage = (): void => {
  LocalStorage.deleteItem('user');
};
// const _updateUserInLocalStorage = (user: UserApi.UserEntity): void => {
//   _removeUserInLocalStorage();
//   _setUserInLocalStorage(user);
// };

const UserHelper = {
  removeUserInLocalStorage(): void {
    _removeUserInLocalStorage();
  },

  setUserInLocalStorage(user: UserApi.UserEntity): void {
    _setUserInLocalStorage(user);
  },

  // async updateOne(accessToken: string, user: UserEntity): Promise<void> {
  //    await UserApi.updateOne(accessToken, user);

  //   _updateUserInLocalStorage(await AuthApi.getUserByAccessToken(accessToken));
  // }
};

export default UserHelper;
