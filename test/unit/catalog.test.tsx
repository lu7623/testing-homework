import React from "react";
import { initState, LocalStorageMock } from "../helper";
import { render, screen, waitFor } from "@testing-library/react";
import { Catalog } from "../../src/client/pages/Catalog";
import { Provider } from "react-redux";
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";


beforeEach(async () => {
  global.localStorage = new LocalStorageMock();
  localStorage.setItem('example-store-cart', JSON.stringify({
    "123": {
        "name": "Best kogtetochka",
        "count": 1,
        "price": 200
    }}))

  const init = initState()
  await waitFor(() => {
    render(
      <BrowserRouter>
        <Provider store={init}>
          <Catalog />
        </Provider>
      </BrowserRouter>
    );
  })
  
});

afterEach(() => {
  jest.clearAllMocks();
});


describe("Тестирование каталога", () => {
  it("В каталоге отображаются товары, список которых приходит с сервера",  () => {
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
  it("Если товар уже добавлен в корзину, в каталоге должно отображаться сообщение об этом", async () => {

await waitFor (() => {

  const product1 = screen.getAllByTestId("123")[1];
  expect(product1).toHaveTextContent('Item in cart')
});
})

});
