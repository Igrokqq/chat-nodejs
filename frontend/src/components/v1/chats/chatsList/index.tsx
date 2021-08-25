import React from "react";
import { ChatEntity } from "../../../../api/chat.api";
import { UserEntity } from "../../../../api/user.api";
import AuthHelper from "../../../../helpers/auth.helper";
import ChatsItem from "../chatsItem";
import NoChats from "./noChats";
import { useHistory } from "react-router-dom";

type Props = {
	readonly chats: ChatEntity[];
	readonly socket: any;
}
export default function ChatsList(props: Props): JSX.Element {
	const history = useHistory();

	const onChatClick = (chatId: number): void => {
		const user: UserEntity | null = AuthHelper.getUser();
		props.socket.emit('chat:join', {
			chatId,
			userId: user ? user.id : null
		});
		history.push(`/chat/${chatId}`);
	};

	return (
		<div>
			{props.chats.length
			  ? props.chats.map((chat: ChatEntity, index: number) => <ChatsItem chat={chat} onClick={onChatClick} key={index} />)
				: <NoChats />
			}
		</div>
	)
}