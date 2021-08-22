import { SignInFieldsData } from "../components/v1/signInForm/types";
import config from "../config";
import { UserEntity } from "./user.api";

export type SignInResponse = {
	readonly accessToken: string;
	readonly refreshToken: string;
};
export type LogoutPayload = {
	readonly accessToken: string;
	readonly refreshToken: string;
	readonly email: string;
}

export const signIn = async (data: SignInFieldsData): Promise<SignInResponse | never> => {
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

export const getUserByAccessToken = async (accessToken: string): Promise<UserEntity> => {
	const response: Response = await fetch(`${config.api.baseUrl}/auth/me`, {
		headers: {
			authorization: `Bearer ${accessToken}`,
		}
	});
		const json = await response.json();

	if (!response.ok) {
		throw new Error(json.error)
	}

	return json.body;
};

export const logout = async (payload: LogoutPayload): Promise<void> => {
	const response: Response = await fetch(`${config.api.baseUrl}/auth/logout`, {
		method: "DELETE",
		body: JSON.stringify({
			email: payload.email,
			refreshToken: payload.refreshToken
		}),
		headers: {
			'Content-Type': "application/json",
			authorization: `Bearer ${payload.accessToken}`
		}
	})
	const json = await response.json();

	if (!response.ok) {
		throw new Error(json.error);
	}
}