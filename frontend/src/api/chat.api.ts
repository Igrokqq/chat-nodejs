import { CreateChatFormState } from "../components/v1/chats/createChatForm/types";
import config from "../config";

export type ChatEntity = {
	readonly id: number;
	readonly label: string;
	readonly description: string;
	readonly ownerId: number;
	readonly created_at: Date;
	readonly updated_at: Date;
}
export type GetAllOptions = {
	readonly limit?: number;
	readonly skip?: number;
};
export type CreateChatDto = CreateChatFormState & {
	readonly ownerId: number;
}
const ChatApi = {
	async getUserChats(userId: number, options: GetAllOptions, accessToken: string): Promise<ChatEntity[]> {
		const response: Response = await fetch(
			`${config.api.baseUrl}/chat?userId=${userId}&limit=${options.limit}&skip=${options.skip}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		)
		const json = await response.json();

		if (!response.ok) {
			throw new Error(json.error);
		}

		return json.body;
	},
	async createChat(data: CreateChatDto, accessToken: string): Promise<void> {
		const response: Response = await fetch(`${config.api.baseUrl}/chat`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				'Content-Type': "application/json",
				Authorization: `Bearer ${accessToken}`,
			}
		})
		const json = await response.json();

		if (!response.ok) {
			throw new Error(json.error);
		}

		return json.body;
	}
}

export default ChatApi;