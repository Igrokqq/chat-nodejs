import React, { Props, ReactPropTypes } from "react";
import { Container } from "react-bootstrap";

export default function AuthLayout(props: Props<ReactPropTypes>): JSX.Element {
	return (
		<Container className="mt-5 p-5 d-flex justify-content-center">
			<div className="w-50">
				{props.children}
			</div>
		</Container>
	)
}