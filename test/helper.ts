import { AxiosHeaders, AxiosResponse } from "axios";
import { CartApi, ExampleApi } from "../src/client/api";
import { initStore } from "../src/client/store";
import {
  CartState,
  CheckoutFormData,
  CheckoutResponse,
  Product,
  ProductShortInfo,
} from "../src/common/types";

const mockProducts: ProductShortInfo[] = [
  {
    name: "Best kogtetochka",
    id: 123,
    price: 200,
  },
  {
    name: "Savage kogtetochka",
    id: 234,
    price: 400,
  },
  {
    name: "Unique kogtetochka",
    id: 345,
    price: 500,
  },
];

const mockProduct: Product = {
  color: "Blue",
  description: "Really Incredible kogtetochka for Sphynx",
  material: "cotton",
  name: "Best kogtetochka",
  id: 123,
  price: 200,
};

class MockExampleApi extends ExampleApi {
  constructor(basename: string) {
    super(basename);
  }
  getProducts() {
    const res: AxiosResponse<ProductShortInfo[], any> = {
      data: mockProducts,
      status: 200,
      statusText: "Success",
      headers: {},
      config: { headers: new AxiosHeaders() },
    };
    return Promise.resolve(res);
  }
  getProductById(id: number) {
    const res: AxiosResponse<Product, any> = {
      data: mockProduct,
      status: 200,
      statusText: "Success",
      headers: {},
      config: { headers: new AxiosHeaders() },
    };
    return Promise.resolve(res);
  }
  checkout(form: CheckoutFormData, cart: CartState) {
    const res: AxiosResponse<CheckoutResponse, any> = {
      data: { id: 1 },
      status: 200,
      statusText: "Success",
      headers: {},
      config: { headers: new AxiosHeaders() },
    };
    return Promise.resolve(res);
  }
}

export function initState() {
  const basename = "/hw/store";
  const api = new MockExampleApi(basename);
  const cart = new CartApi();
  const store = initStore(api, cart);
  return store;
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
