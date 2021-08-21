export type SignInFieldsData = {
	readonly email: string;
	readonly password: string;
}

export type SignInFieldsErrors = {
	readonly email: string | null;
	readonly password: string | null;
}