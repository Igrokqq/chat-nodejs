import { SignInFieldsData } from "../components/v1/signInForm/types";
import config from "../config";

export type JwtTokens = {
	readonly accessToken: string;
	readonly refreshToken: string;
}
export const signIn = async (data: SignInFieldsData): Promise<JwtTokens | never> => {
	const response: Response = await fetch(`${config.api.baseUrl}/auth/login`, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json"
		}
	})
	const json = await response.json();

	if (!response.ok) {
		throw new Error(json.error);
	}

	return json;
}