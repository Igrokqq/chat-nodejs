import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import SignInForm from "../../components/v1/signInForm";
import AuthLayout from "../../layouts/auth";
import * as eventBus from "../../common/eventBus";
import { EVENTS } from "../../components/v1/signInForm/presenter";
import { useMutation } from "react-query";
import { JwtTokens, signIn } from "../../api/auth.api";
import * as LocalStorage from "../../common/localStorage";

const MAX_VISIBLE_ERRORS = 3;

export default function SignIn(): JSX.Element {
	const [errors ,setErrors] = useState([""]);
	const signInMutation = useMutation(signIn, {
		onSuccess(tokens: JwtTokens) {
			LocalStorage.setItem("user:tokens", tokens)
			window.location.href = "/";
		},
		onError(error: Error): void {
			setErrors(error.message.split(','));
		},
	});

	const onSubmit = ({ detail }: CustomEventInit) => {
		signInMutation.mutate(detail);
	};

	useEffect(() => {
		eventBus.on(EVENTS.SUBMIT, onSubmit)

		return (): void => {
			eventBus.off(EVENTS.SUBMIT, onSubmit);
		}
	}, [])
	return (
		<AuthLayout>
			{signInMutation.error ? errors.slice(0,MAX_VISIBLE_ERRORS).map((errorMessage: string, index: number): JSX.Element => {
					return <Alert key={index} variant="danger">{errorMessage}</Alert>
				}) : ''}
			<SignInForm isSubmitDisabled={signInMutation.isLoading} />
		</AuthLayout>
	)
}