export class UserExistsError extends Error {
  constructor() {
    super("The user already exists");
  }
}
