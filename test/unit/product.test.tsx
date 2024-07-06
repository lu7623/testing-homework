import React from "react";
import { initState, LocalStorageMock } from "../helper";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProductDetails } from "../../src/client/components/ProductDetails";
import { Product } from "../../src/common/types";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";


const mockProduct: Product = {
  color: "Blue",
  description: "Really Incredible kogtetochka for Sphynx",
  material: "cotton",
  name: "Best kogtetochka",
  id: 123,
  price: 200,
};


beforeEach(() => { 
 
  global.localStorage = new LocalStorageMock();
 
const init = initState()
  render(
    <BrowserRouter>
    <Provider store={init}>
      <ProductDetails product={mockProduct} />
      </Provider>
      </BrowserRouter>
  );
})


describe("Тестирование страницы товара", () => {
  it('На странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"', () => {

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
  
    const addToCartBtn = screen.getByText("Add to Cart");
    fireEvent.click(addToCartBtn);
    await waitFor(() => {
      expect(localStorage.getItem('example-store-cart')).toStrictEqual(JSON.stringify({'123': {name: mockProduct.name, count: 1, price:mockProduct.price}}))
    })

    fireEvent.click(addToCartBtn);

    await waitFor(() => {
      expect(localStorage.getItem('example-store-cart')).toStrictEqual(JSON.stringify({'123': {name: mockProduct.name, count: 2, price:mockProduct.price}}))
    });
  });
  it("Если товар уже добавлен в корзину, на странице товара должно отображаться сообщение об этом", async () => {


    const addToCartBtn = screen.getByText("Add to Cart");
    fireEvent.click(addToCartBtn);

    await waitFor(() => {
      expect(screen.getByText("Item in cart")).toBeInTheDocument();
    });
  });
  
});
