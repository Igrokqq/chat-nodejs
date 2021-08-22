import styles from "./noChatsText.module.css";

export default function NoChatsText(): JSX.Element {
	return <div className={styles.text}>It seems like you don't have any chats yet....</div>;
}