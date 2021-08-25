import { ChatEntity } from "../../../../api/chat.api"
import styles from "./chatsItem.module.css";

type Props = {
	readonly chat: ChatEntity;
	readonly onClick: (chatId: number) => void;
}

export default function ChatsItem(props: Props): JSX.Element {
	return (
		<div className={styles.container}>
			<div
				className={styles.text}
				onClick={props.onClick.bind(null, props.chat.id)}
			>{props.chat.label}</div>
		</div>
	)
}