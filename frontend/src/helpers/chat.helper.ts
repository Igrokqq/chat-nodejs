import ChatApi, { ChatEntity } from "../api/chat.api";

const CHATS_PER_PAGE = 5;

const ChatHelper = {
	getUserChats(userId: number): Promise<ChatEntity[]> {
		return ChatApi.getUserChats(userId, {
			limit: CHATS_PER_PAGE,
			skip: 0
		});
	}
}

export default ChatHelper;