/// <reference types="react-scripts" />
declare interface NodeJSProcessEnv {
	readonly NODE_ENV?: "staging" | "development" | "production" | "test";
	readonly PORT?: number;
	readonly REACT_APP_API_BASE_URL?: string;
}