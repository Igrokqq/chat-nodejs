export class UserExistsError extends Error {
  constructor() {
    super("The user already exists");
  }
}
export class UserNotExistsError extends Error {
  constructor() {
    super("The user not existing");
  }
}
export class UserIncorrectPassword extends Error {
  constructor(password?: string) {
    super(`Password ${password || ""} is incorrect`);
  }
}
