import { initState, LocalStorageMock } from "../helper";
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Application } from "../../src/client/Application";

beforeEach(() => {
  global.localStorage = new LocalStorageMock();
  localStorage.setItem(
    "example-store-cart",
    JSON.stringify({
      "0": {
        name: "Solid kogtetochka",
        count: 3,
        price: 200,
      },
      "1": {
        name: "Luxury kogtetochka",
        count: 2,
        price: 1300,
      },
    })
  );
  const init = initState();
  render(
    <BrowserRouter>
      <Provider store={init}>
        <Application />
      </Provider>
    </BrowserRouter>
  );
});

describe("Тестирование хедера", () => {
  it("в шапке отображаются ссылки на страницы магазина, а также ссылка на корзину", () => {
    const catalog = screen.getByText("Catalog");
    const delivery = screen.getByText("Delivery");
    const contacts = screen.getByText("Contacts");
    const cart = screen.getByText("Cart", { exact: false });

    expect(catalog).toBeInTheDocument();
    expect(catalog).toHaveAttribute("href", "/catalog");
    expect(delivery).toBeInTheDocument();
    expect(delivery).toHaveAttribute("href", "/delivery");
    expect(contacts).toBeInTheDocument();
    expect(contacts).toHaveAttribute("href", "/contacts");
    expect(cart).toBeInTheDocument();
    expect(cart).toHaveAttribute("href", "/cart");
  });
  it("название магазина в шапке должно быть ссылкой на главную страницу", () => {
    const title = screen.getByText("Kogtetochka store");

    expect(title).toBeInTheDocument();
    expect(title).toHaveAttribute("href", "/");
  });
  it("Отображение количества товаров в корзине в шапке", () => {
    const cart = screen.getByText("Cart (2)");

    expect(cart).toBeInTheDocument();
  });
  it('на ширине меньше 576px навигационное меню должно скрываться за "гамбургер", при выборе элемента из меню "гамбургера", меню должно закрываться', async () => {
    await waitFor(() => {
      window.innerWidth = 500;
      fireEvent(window, new Event("resize"));
    });

    const burger = screen.getByRole("button");
    fireEvent.click(burger);

    const catalog = screen.getByText("Catalog");
    fireEvent.click(catalog);
    
    await waitFor(() => {

      const navBar = screen.getByText((_, element) => {
        return (!!element &&
          element.classList.contains("Application-Menu")
        );
      });

      expect(navBar).toHaveClass('collapse' );
    });
  });
});