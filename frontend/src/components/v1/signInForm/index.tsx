import React, { useState, FormEvent,ChangeEvent } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { SignInFieldsData, SignInFieldsErrors } from "./types";
import * as SignInFormPresenter from "./presenter";

type SignUpProps ={
	readonly isSubmitDisabled: boolean;
};
const defaultState: SignInFieldsData = {
	email: "",
	password: ""
}
const errorsState: SignInFieldsErrors = {
	email: "",
	password: ""
}
export default function SignUpForm(props: SignUpProps): JSX.Element {
	const [state, setState] = useState(defaultState);
	const [errors, setErrors] = useState(errorsState);

	const onSubmit = async (event: FormEvent): Promise<void> => {
		event.preventDefault();

		const errors: SignInFieldsErrors | null = await SignInFormPresenter.validate(state);

		if (errors) {
			setErrors(errors);
			return;
		}

		SignInFormPresenter.emitSubmit(state);
	}

	const onEmailInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		setState({
			...state,
			email: event.target.value.trim()
		})
	}
	const onPasswordInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		setState({
			...state,
			password: event.target.value.trim()
		});
	}
	return (
		<Form onSubmit={onSubmit}>
			<InputGroup className="mb-3" hasValidation>
				<Form.Label className="w-100 text-start">Email address</Form.Label>
				<Form.Control
				  type="email"
					placeholder="Enter email"
					onChange={onEmailInput}
					isInvalid={!!errors.email}
				/>
			<Form.Control.Feedback type="invalid">
				{errors.email}
			</Form.Control.Feedback>
			</InputGroup>
			<InputGroup className="mb-3">
				<Form.Label className="w-100 text-start">Password</Form.Label>
				<Form.Control
				  type="password"
					placeholder="Password"
					onChange={onPasswordInput}
					isInvalid={!!errors.password}
				/>
				<Form.Control.Feedback type="invalid">
					{errors.password}
				</Form.Control.Feedback>
			</InputGroup>
			<div className="d-flex justify-content-center">
				<Button
				  variant="dark"
					className="w-50 mt-2"
					type="submit"
					disabled={props.isSubmitDisabled}
				>Sign in</Button>
			</div>
		</Form>
	)
}