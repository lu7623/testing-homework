import React from "react";
import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProductDetails } from "../../src/client/components/ProductDetails";
import { Product } from "../../src/common/types";
import { Provider } from "react-redux";
import { initStore } from "../../src/client/store";
import { CartApi, ExampleApi } from "../../src/client/api";

const mockProduct: Product = {
  color: "Blue",
  description: "Really Incredible kogtetochka for Sphynx",
  material: "cotton",
  name: "Best kogtetochka",
  id: 123,
  price: 200,
};

const basename = "/hw/store";
const api = new ExampleApi(basename);
const cart = new CartApi();
const store = initStore(api, cart);

describe("Тестирование страницы товара", () => {
  it('На странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"', () => {
    render(
      <Provider store={store}>
        <ProductDetails product={mockProduct} />
      </Provider>
    );

    const name = screen.getByText("Best kogtetochka");
    const description = screen.getByText(
      "Really Incredible kogtetochka for Sphynx"
    );
    const color = screen.getByText("Blue");
    const material = screen.getByText("cotton");
    const price = screen.getByText("$200");
    const addToCartBtn = screen.getByText("Add to Cart");

    expect(name).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(color).toBeInTheDocument();
    expect(material).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(addToCartBtn).toBeInTheDocument();
  });
  it('если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество', async () => {
    render(
      <Provider store={store}>
        <ProductDetails product={mockProduct} />
      </Provider>
    );

    const addToCartBtn = screen.getByText("Add to Cart");
    fireEvent.click(addToCartBtn);
    await waitFor(() => {
      expect(store.getState().cart[123].count).toBe(1);
    })

    fireEvent.click(addToCartBtn);

    await waitFor(() => {
      expect(store.getState().cart[123].count).toBe(2);
    });
  });
  it("Если товар уже добавлен в корзину, в каталоге и на странице товара должно отображаться сообщение об этом", async () => {
    render(
      <Provider store={store}>
        <ProductDetails product={mockProduct} />
      </Provider>
    );

    const addToCartBtn = screen.getByText("Add to Cart");
    fireEvent.click(addToCartBtn);

    await waitFor(() => {
      expect(screen.getByText("Item in cart")).toBeInTheDocument();
    });
  });
 
});
