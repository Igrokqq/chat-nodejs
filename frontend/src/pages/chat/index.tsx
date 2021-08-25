import React, { ChangeEvent, useEffect, useState,KeyboardEvent } from "react";
import { Form, Container } from "react-bootstrap";
import { useParams } from "react-router";
import { UserEntity } from "../../api/user.api";
import AuthHelper from "../../helpers/auth.helper";
import styles from "./chat.module.css";

export default function Chat({ socket, match }: any): JSX.Element {
	const params: any = useParams();

	const sendMessageOnEnter = (event: any): void => {
		const isEnter: boolean = event.keyCode === 13;
		const user: UserEntity | null = AuthHelper.getUser();
// body, fromUserId, chatId
		if (isEnter) {
			socket.emit("chat:message", {
				chatId: params.chatId,
				fromUserId: (user || {}).id,
				body: event.target.value.trim()
			});
			event.target.value = "";
		}
		console.log(event.keyCode === 13);
	};

	useEffect(() => {
		window.addEventListener("keypress", sendMessageOnEnter);

		return (): void => {
			window.removeEventListener("keypress", sendMessageOnEnter);
		}
	}, [])

	return (
		<Container className={styles.container}>
			<div>It's a chat</div>
			<div className={styles.messageInput}>
				<Form.Control
				  type="text"
					placeholder="type message..."
				/>
			</div>
		</Container>
	);
}