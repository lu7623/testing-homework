import React from "react";
import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Cart } from "../../src/client/pages/Cart";
import { initState } from "./helper";


describe('Тестирование корзины', () => {
 
  it('Отображение таблицы товаров в корзине', () => {
    const init= initState(false)
    render(
      <BrowserRouter>
      <Provider store={init.store}>
        <Cart />
        </Provider>
        </BrowserRouter>
    );

    const product1 = screen.getByText('Solid kogtetochka')
    const product2 = screen.getByText('Luxury kogtetochka')
    const price1 = screen.getByText('$200')
    const price2 = screen.getByText('$1300')
    const total1 = screen.getByText('$600')
    const total2= screen.getByText('$2600')

    expect(product1).toBeInTheDocument()
    expect(product2).toBeInTheDocument()
    expect(price1).toBeInTheDocument()
    expect(price2).toBeInTheDocument()
    expect(total1).toBeInTheDocument()
    expect(total2).toBeInTheDocument()
  });
 
  it('Очистка корзины по кнопке', () => {
    const init= initState(false)
    render(
      <BrowserRouter>
      <Provider store={init.store}>
        <Cart />
        </Provider>
        </BrowserRouter>
    );
   const clearCart = screen.getByText('Clear shopping cart')
      fireEvent.click(clearCart);


      expect(init.store.getState().cart).toStrictEqual({})
  });
 
  it('Если корзина пуста, отображается ссылка', async () => {
    const init= initState(false)
    render(
      <BrowserRouter>
      <Provider store={init.store}>
        <Cart />
        </Provider>
        </BrowserRouter>
    );

    const clearCart = screen.getByText('Clear shopping cart')
    fireEvent.click(clearCart);


      await waitFor(() => {
        const emptyCart = screen.getByText('Cart is empty',  { exact: false })
        const link = screen.getByRole('link');
        expect(emptyCart).toBeInTheDocument();
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', '/catalog')
      })
      
  
    });
 
});