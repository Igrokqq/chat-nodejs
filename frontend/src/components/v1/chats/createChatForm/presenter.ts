import * as yup from "yup";
import { CreateChatFormErrors, CreateChatFormState } from "./types";
import * as eventBus from "../../../../common/eventBus";
import ChatHelper from "../../../../helpers/chat.helper";
import AuthHelper from "../../../../helpers/auth.helper";
import { UserEntity } from "../../../../api/user.api";

export const EVENTS = {
	SUBMIT: 'createChatForm:submit'
};

export const validate = async (data: CreateChatFormState): Promise<CreateChatFormErrors | null> => {
	const validateLabel = async (label: string): Promise<string | null> => {
		try {
			await yup.string().min(1).max(64).required().validate(label);

			return null;
		} catch (error) {
			return error.errors.join();
		}
	}
	const validateDescription = async (description: string): Promise<string | null> => {
		try {
			 await yup.string().min(20).max(240).optional().validate(description);

			 return null;
		} catch (error) {
			return error.errors.join()
		}
	}

	const validationResponse = await Promise.all([
		validateLabel(data.label),
		validateDescription(data.description)
	]);

	return validationResponse.every((error: string | null): boolean => {
		return error === null;
	}) ? null : {
		label: validationResponse[0],
		description: validationResponse[1]
	}
}

export const onSubmit = async (data: CreateChatFormState): Promise<void> => {
	const accessToken: string | null = AuthHelper.getJwtAccessToken();
	const user: UserEntity | null = AuthHelper.getUser();

	if (accessToken && user) {
		await ChatHelper.createChat({
			...data,
			ownerId: user.id
		}, accessToken);
	}
}
