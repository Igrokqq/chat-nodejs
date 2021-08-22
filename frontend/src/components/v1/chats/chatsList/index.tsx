import { ChatEntity } from "../../../../api/chat.api";
import ChatsItem from "../chatsItem";
import NoChats from "./noChats";

type Props = {
	readonly chats: ChatEntity[];
}
export default function ChatsList(props: Props): JSX.Element {
	return (
		<div>
			{props.chats.length
			  ? props.chats.map((chat: ChatEntity) => <ChatsItem chat={chat} />)
				: <NoChats />
			}
		</div>
	)
}