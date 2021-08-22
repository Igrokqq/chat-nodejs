import { ChatEntity } from "../../../../api/chat.api"

type Props = {
	readonly chat: ChatEntity;
}

export default function ChatsItem(props: Props): JSX.Element {
	return (
		<div>{props.chat.label}</div>
	)
}