export interface ServerInterface {
  run(): Promise<void>;
}
export interface ServerDependenciesInterface {
  applyTo(app: unknown): void;
}
