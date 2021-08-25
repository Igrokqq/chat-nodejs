import { ReactPropTypes, Props, MouseEvent } from "react";
import styles from "./logoutButton.module.css";
import { useMutation } from "react-query";
import AuthHelper from "../../../helpers/auth.helper";
import { UserEntity } from "../../../api/user.api";
import * as LocalStorage from "../../../common/localStorage";

export default function LogoutButton(props: Props<ReactPropTypes>): JSX.Element {
	const logoutMutation = useMutation(AuthHelper.logout, {
		onSuccess() {
			console.info("Logout happened");
			LocalStorage.clear();
			window.location.reload();
		},
		onError(): void {
			LocalStorage.clear();
			window.location.reload();
		}
	})
	const onClick = async (event: MouseEvent<HTMLDivElement>): Promise<void> => {
		event.preventDefault()
		const user: UserEntity | null = AuthHelper.getUser();

		logoutMutation.mutate({
			...AuthHelper.getJwtTokens(),
			email: user ? user.email : ""
		})
	}

	return <div onClick={onClick} className={styles.text}>{props.children}</div>
}