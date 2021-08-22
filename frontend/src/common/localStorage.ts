export const setItem = (key: string, value: unknown): void => {
	localStorage.setItem(key, JSON.stringify(value));
}
export const getItem = (key: string): any | null => {
	return JSON.parse(localStorage.getItem(key) || "null");
}
export const deleteItem = (key: string): void => {
	localStorage.removeItem(key);
}
export const clear = (): void => {
	localStorage.clear();
}