import React from "react";
import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { ProductShortInfo } from "../../src/common/types";
import { Catalog } from "../../src/client/pages/Catalog";
import { Provider } from "react-redux";
import { initStore } from "../../src/client/store";
import { CartApi, ExampleApi } from "../../src/client/api";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

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

jest.mock("axios", () => ({
  get: jest
    .fn()
    .mockImplementation(() => Promise.resolve({ data: mockProducts })),
}));

const mockUseSelector = jest.fn().mockReturnValue(mockProducts);
const mockUseDispatch = jest.fn().mockReturnValue(mockProducts);

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useSelector: mockUseSelector,
  useDispatch: mockUseDispatch,
  React: jest.fn(),
}));

jest.mock("../../src/client/store", () => ({
  ...jest.requireActual("../../src/client/store"),
  productsLoad: jest.fn().mockReturnValue({ type: "PRODUCTS_LOAD" }),
}));

const basename = "/hw/store";
const api = new ExampleApi(basename);
const cart = new CartApi();
const store = initStore(api, cart);

beforeEach(() => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Catalog />
      </Provider>
    </BrowserRouter>
  );
});
describe("Тестирование каталога", () => {
  it("В каталоге отображаются товары, список которых приходит с сервера", async () => {
    await waitFor(() => {
      const product1 = screen.getAllByTestId("123")[1];
      const product2 = screen.getAllByTestId("234")[1];
      const product3 = screen.getAllByTestId("345")[1];

      expect(product1).toBeInTheDocument();
      expect(product1).toHaveAttribute(
        "class",
        expect.stringMatching("ProductItem")
      );
      expect(product2).toBeInTheDocument();
      expect(product2).toHaveAttribute(
        "class",
        expect.stringMatching("ProductItem")
      );
      expect(product3).toBeInTheDocument();
      expect(product3).toHaveAttribute(
        "class",
        expect.stringMatching("ProductItem")
      );
    });
  });
  it("Для каждого товара отображается цена, название и ссылка", () => {
    const price1 = screen.getByText("$200");
    const price2 = screen.getByText("$400");
    const price3 = screen.getByText("$500");

    const name1 = screen.getByText("Best kogtetochka");
    const name2 = screen.getByText("Savage kogtetochka");
    const name3 = screen.getByText("Unique kogtetochka");

    const link1 = screen.getAllByRole("link")[0];
    const link2 = screen.getAllByRole("link")[1];
    const link3 = screen.getAllByRole("link")[2];

    expect(price1).toBeInTheDocument();
    expect(price2).toBeInTheDocument();
    expect(price3).toBeInTheDocument();

    expect(name1).toBeInTheDocument();
    expect(name2).toBeInTheDocument();
    expect(name3).toBeInTheDocument();

    expect(link1).toBeInTheDocument();
    expect(link1).toHaveAttribute("href", "/catalog/123");
    expect(link2).toBeInTheDocument();
    expect(link2).toHaveAttribute("href", "/catalog/234");
    expect(link3).toBeInTheDocument();
    expect(link3).toHaveAttribute("href", "/catalog/345");
  });
});
