import * as yup from "yup";
import * as eventBus from "../../../common/eventBus";
import { SignInFieldsData, SignInFieldsErrors } from "./types";

export const EVENTS: Record<string, string> = {
	SUBMIT: 'signin:submit'
};

export const emitSubmit = (data: SignInFieldsData) => {
	eventBus.trigger(EVENTS.SUBMIT, data);
}

export const validate = async (data: SignInFieldsData): Promise<SignInFieldsErrors | null> => {
	const validateEmail = async (email: string): Promise<string | null> => {
		try {
			await yup.string().email().required().validate(email);

			return null;
		} catch (error) {
			return error.errors.join();
		}
	}

	const validatePassword = async (password: string): Promise<string | null> => {
		try {
			await yup.string().min(8).max(64).required().validate(password);

			return null;
		} catch (error) {
			return error.errors.join();
		}
	}

	const validationResponse = await Promise.all([
		validateEmail(data.email),
		validatePassword(data.password)
	])

	return validationResponse.every((error: string | null): boolean => {
		return error === null;
	}) ? null : {
		email: validationResponse[0],
		password: validationResponse[1]
	}
}