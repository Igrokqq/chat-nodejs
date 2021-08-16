import { GlobalInterface } from "./interfaces";

export default class GlobalManager {
  static readonly global: NodeJS.Global = global as unknown as GlobalInterface;

  static extendWithProperty(propertyName: string, value: unknown): void {
    this.global[propertyName] = value;
  }

  static removeProperty(propertyName: string): void {
    delete this.global[propertyName];
  }

  static getProperty(propertyName: string): unknown | null {
    return this.global[propertyName] || null;
  }
}
