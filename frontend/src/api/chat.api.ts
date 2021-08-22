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

const ChatApi = {
	async getUserChats(userId: number, options: GetAllOptions): Promise<ChatEntity[]> {
		const response: Response = await fetch(
			`${config.api.baseUrl}/chat?userId=${userId}&limit=${options.limit}&skip=${options.skip}`
		)
		const json = await response.json();

		if (!response.ok) {
			throw new Error(json.error);
		}

		return json.body;
	}
}

export default ChatApi;