import { CartApi, ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";

const basename = "/hw/store";
const api = new ExampleApi(basename);
export const cart = new CartApi();
cart.setState([{ count: 3, price: 200, name: 'Solid kogtetochka' }, { count: 2, price: 1300, name: 'Luxury kogtetochka' }]);
export const store = initStore(api, cart);

