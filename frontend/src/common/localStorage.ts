export const setItem = (key: string, value: unknown): void => {
	localStorage.setItem(key, JSON.stringify(value));
}
export const getItem = (key: string, value: unknown): unknown => {
	return localStorage.getItem(key);
}
export const deleteItem = (key: string): void => {
	localStorage.removeItem(key);
}