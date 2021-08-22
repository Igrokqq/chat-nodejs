import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import SignInForm from "../../components/v1/signInForm";
import AuthLayout from "../../layouts/auth";
import * as eventBus from "../../common/eventBus";
import { EVENTS } from "../../components/v1/signInForm/presenter";
import { useMutation } from "react-query";
import { SignInResponse } from "../../api/auth.api";
import AuthHelper from "../../helpers/auth.helper";
import { ComponentReduxProps } from "../../redux/types";

const MAX_VISIBLE_ERRORS = 3;

export default function SignIn({ dispatch }: ComponentReduxProps): JSX.Element {
	const [errors ,setErrors] = useState([""]);
	const signInMutation = useMutation(AuthHelper.signIn, {
		onSuccess(_tokens: SignInResponse) {
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