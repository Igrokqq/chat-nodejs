export const trigger = (eventName: string, data: unknown): void => {
	document.dispatchEvent(new CustomEvent(eventName, { detail: data }))
}
export const on = (eventName: string, handler: (...args: any) => any | Promise<any>) => {
	document.addEventListener(eventName, handler);
}
export const off = (eventName: string, handler: (...args: any) => any | Promise<any>) => {
	document.removeEventListener(eventName, handler);
}
export const once = (eventType: string, handler: (...args: any) => any | Promise<any>) => {
  on(eventType, handleEventOnce);

  function handleEventOnce(eventName: string): void {
    handler(eventName);
    off(eventType, handleEventOnce);
  }
}