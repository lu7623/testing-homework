import React from "react";
import renderer from "react-test-renderer";
import {Delivery} from "../../src/client/pages/Delivery"
import {Home} from "../../src/client/pages/Home"
import {Contacts} from "../../src/client/pages/Contacts"
import { Provider } from "react-redux";
import { ProductDetails } from "../../src/client/components/ProductDetails";
import { initState, LocalStorageMock } from "../helper";
import { Product } from "../../src/common/types";
import { Catalog } from "../../src/client/pages/Catalog";
import { Cart } from "../../src/client/pages/Cart";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Страницы отображаются верно", () => {
  it("Страница доставки сохраняет статическое содержание", () => {
    const domTree = renderer.create(<Delivery />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
  it("Главная страница сохраняет статическое содержание", () => {
    const domTree = renderer.create(<Home />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
  it("Страница контактов сохраняет статическое содержание", () => {
    const domTree = renderer.create(<Contacts />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
  it("Страница продукта отображается верно", () => {
    const init = initState();
    const mockProduct: Product = {
        color: "Blue",
        description: "Really Incredible kogtetochka for Sphynx",
        material: "cotton",
        name: "Best kogtetochka",
        id: 123,
        price: 200,
      };
    const domTree = renderer.create(<Provider store={init}>
        <ProductDetails product={mockProduct} />
      </Provider>).toJSON();
    expect(domTree).toMatchSnapshot();
  });
  it("Страница каталога отображается верно", () => {
   
  const init = initState()
    const domTree = renderer.create(<Provider store={init}>
        <Catalog />
      </Provider>).toJSON();
    expect(domTree).toMatchSnapshot();
  });
  it("Страница корзины отображается верно", () => {
    global.localStorage = new LocalStorageMock();
    localStorage.setItem('example-store-cart', JSON.stringify({
      "0": {
          "name": "Solid kogtetochka",
          "count": 3,
          "price": 200
      },
      "1": {
          "name": "Luxury kogtetochka",
          "count": 2,
          "price": 1300
      }
  }))
   const init = initState()
    const domTree = renderer.create(<Provider store={init}>
        <Cart/>
      </Provider>).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});