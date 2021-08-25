import { ReactPropTypes, Props as ReactProps } from "react";

export type CreateChatFormState = {
	readonly label: string;
	readonly description: string;
}
export type CreateChatFormErrors = {
	readonly label: string | null;
	readonly description: string | null;
}
export type Props = { readonly isSubmitDisabled: boolean };