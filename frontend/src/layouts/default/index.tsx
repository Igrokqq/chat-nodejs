import React, { Props, ReactPropTypes } from "react";
import DefaultHeader from "../../components/common/defaultHeader";

export default function DefaultLayout(props: Props<ReactPropTypes>): JSX.Element {
	return (
		<div>
			<DefaultHeader />
			{props.children}
		</div>
	)
}