import ChatApi, { ChatEntity, CreateChatDto } from "../api/chat.api";
import { CreateChatFormState } from "../components/v1/chats/createChatForm/types";

const CHATS_PER_PAGE = 5;

const ChatHelper = {
	getUserChats(userId: number, accessToken: string): Promise<ChatEntity[]> {
		return ChatApi.getUserChats(userId, {
			limit: CHATS_PER_PAGE,
			skip: 0
		}, accessToken);
	},
	createChat(data: CreateChatDto, accessToken: string): Promise<void> {
		return ChatApi.createChat(data, accessToken)
	}
}

export default ChatHelper;