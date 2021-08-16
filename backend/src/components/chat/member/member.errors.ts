export class MemberExistsError extends Error {
  constructor(chatId?: number) {
    super(
      chatId
        ? `Member already exists in ${chatId} chat`
        : "Member already exists"
    );
    this.name = "MemberExistsError";
  }
}
