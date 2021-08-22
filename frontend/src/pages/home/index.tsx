import DefaultLayout from "../../layouts/default";
import { Container } from "react-bootstrap";
import ChatsList from "../../components/v1/chats/chatsList";
import { useQuery } from "react-query";
import { UserEntity } from "../../api/user.api";
import AuthHelper from "../../helpers/auth.helper";
import ChatHelper from "../../helpers/chat.helper";

export default function Home(): JSX.Element {
	const {
		data: chats,
		isLoading: chatsStillLoading
	} = useQuery("chats", () => {
		const user: UserEntity | null = AuthHelper.getUser();

		if (user) {
			return ChatHelper.getUserChats(user.id)
		}
	});

	return (
		<DefaultLayout>
			<Container className="mt-5">
				{chatsStillLoading ? "Loading chats..."  : <ChatsList chats={chats || []} />}
			</Container>
		</DefaultLayout>
	)
}