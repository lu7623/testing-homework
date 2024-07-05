import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProductDetails } from "../../src/client/components/ProductDetails";
import {ProductItem} from '../../src/client/components/ProductItem'
import { Product } from "../../src/common/types";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { initState } from "./helper";
import { addToCart } from "../../src/client/store";

const mockProduct: Product = {
  color: "Blue",
  description: "Really Incredible kogtetochka for Sphynx",
  material: "cotton",
  name: "Best kogtetochka",
  id: 123,
  price: 200,
};

describe("Тестирование страницы товара", () => {
  it('На странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"', () => {
   
   const init = initState(true)
    render(
      <Provider store={init.store}>
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
       
   const init = initState(true)
    
    render(
      <Provider store={init.store}>
        <ProductDetails product={mockProduct} />
      </Provider>
    );

    const addToCartBtn = screen.getByText("Add to Cart");
    fireEvent.click(addToCartBtn);
    await waitFor(() => {
      expect(init.store.getState().cart[123].count).toBe(1);
    })

    fireEvent.click(addToCartBtn);

    await waitFor(() => {
      expect(init.store.getState().cart[123].count).toBe(2);
    });
  });
  it("Если товар уже добавлен в корзину, на странице товара должно отображаться сообщение об этом", async () => {
    const init = initState(true)
    render(
      <Provider store={init.store}>
        <ProductDetails product={mockProduct} />
      </Provider>
    );

    const addToCartBtn = screen.getByText("Add to Cart");
    fireEvent.click(addToCartBtn);

    await waitFor(() => {
      expect(screen.getByText("Item in cart")).toBeInTheDocument();
    });
  });
  it("Если товар уже добавлен в корзину, в каталоге должно отображаться сообщение об этом", async () => {
    const init = initState(true)
init.store.dispatch(addToCart(mockProduct))
    render(
      <BrowserRouter>
      <Provider store={init.store}>
        <ProductItem product={mockProduct} />
        </Provider>
        </BrowserRouter>
    );

      expect(screen.getByText("Item in cart")).toBeInTheDocument();
  });
});
