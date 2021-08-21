import { SignUpFieldsData } from "../components/v1/signUpForm/types";
import config from "../config";

export const signUp = async (data: SignUpFieldsData): Promise<void | never> => {
	const response: Response = await fetch(`${config.api.baseUrl}/users/signUp`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	})
	if (!response.ok) {
		const json = await response.json();

		throw new Error(json.error)
	}
}