import React, { useEffect, useState } from "react";
import styles from "./noChats.module.css";
import NoChatsText from "./noChatsText";
import CreateChatModal, { EVENTS as  CREATE_CHAT_EVENTS } from "../../createChatModal";
import * as eventBus from "../../../../../common/eventBus";
import { Button } from "react-bootstrap";
import CreateChatForm from "../../createChatForm";

export default function NoChats(): JSX.Element {
	const [createChatModalVisible, setCreateChatModalVisible] = useState(false);

	const onCreateChatModalClose = (): void => {
		setCreateChatModalVisible(false)
	};

	const openCreateChatModal = (): void => {
		setCreateChatModalVisible(true);
	}
	useEffect(() => {
		eventBus.on(CREATE_CHAT_EVENTS.CLOSE, onCreateChatModalClose);

		return (): void => {
			eventBus.off(CREATE_CHAT_EVENTS.CLOSE, onCreateChatModalClose);
		}
	}, []);

	return (
		<div className={styles.container}>
			<CreateChatModal show={createChatModalVisible}>
				<CreateChatForm isSubmitDisabled={false} />
			</CreateChatModal>
			<NoChatsText />
			<div>
				<Button className="w-50 mt-4" variant="dark" onClick={openCreateChatModal}>New Chat</Button>
			</div>
		</div>
	)
}