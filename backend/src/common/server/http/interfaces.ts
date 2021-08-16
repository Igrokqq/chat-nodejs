export interface RequestValidationParams {
  readonly dto: any;
  readonly sourcePropertyName: "body" | "query" | "params";
}
export interface OkResponseInterface {
  readonly message?: string;
  readonly body?: any;
}
