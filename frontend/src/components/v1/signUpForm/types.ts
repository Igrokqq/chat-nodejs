export type SignUpFieldsData = {
	readonly email: string;
	readonly password: string;
}
export type SignUpFieldsErrors = {
	readonly email: string | null;
	readonly password: string | null;
};