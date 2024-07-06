import { CartApi, ExampleApi } from "../src/client/api";
import { initStore } from "../src/client/store";

export function initState () {
const basename = "/hw/store";
const api = new ExampleApi(basename);
 const cart = new CartApi();
 const store = initStore(api, cart);
 return store
}


export class LocalStorageMock {
    store: { [key: string]: string };
  
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key: string) {
      return this.store[key] || null;
    }
  
    setItem(key: string, value: string) {
      this.store[key] = String(value);
    }
  
    removeItem(key: string) {
      delete this.store[key];
    }
  
    key(n: number) {
      return Object.keys(this.store)[n];
    }
  
    length: number = 0;
  }