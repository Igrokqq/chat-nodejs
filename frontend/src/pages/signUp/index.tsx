import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import SignUpForm from "../../components/v1/signUpForm";
import AuthLayout from "../../layouts/auth";
import * as eventBus from "../../common/eventBus";
import { EVENTS } from "../../components/v1/signUpForm/presenter";
import { useMutation } from "react-query";
import { signUp } from "../../api/user.api";

const MAX_VISIBLE_ERRORS = 3;

export default function SignUp(): JSX.Element {
	const [errors ,setErrors] = useState([""]);
	const signUpMutation = useMutation(signUp, {
		onSuccess() {
			window.location.href = "/"
		},
		onError(error: Error): void {
			setErrors(error.message.split(','));
		},
	});

	const onSubmit = ({ detail }: CustomEventInit) => {
		signUpMutation.mutate(detail);
	};

	useEffect(() => {
		eventBus.on(EVENTS.SUBMIT, onSubmit)

		return (): void => {
			eventBus.off(EVENTS.SUBMIT, onSubmit);
		}
	}, [])
	return (
		<AuthLayout>
			{signUpMutation.error ? errors.slice(0,MAX_VISIBLE_ERRORS).map((errorMessage: string, index: number): JSX.Element => {
					return <Alert key={index} variant="danger">{errorMessage}</Alert>
				}) : ''}
			<SignUpForm isSubmitDisabled={signUpMutation.isLoading} />
		</AuthLayout>
	)
}