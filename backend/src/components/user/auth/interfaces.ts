export interface AuthStrategy {
  login: (data: unknown) => Promise<unknown>;
}
