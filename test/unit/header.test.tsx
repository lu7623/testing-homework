import React from "react";
import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import { render, screen} from "@testing-library/react";
import { Provider } from "react-redux";
import { initStore } from "../../src/client/store";
import { CartApi, ExampleApi } from "../../src/client/api";
import { BrowserRouter } from "react-router-dom";
import {Application} from '../../src/client/Application'


const basename = "/hw/store";
const api = new ExampleApi(basename);
const cart = new CartApi();
const store = initStore(api, cart);


beforeEach(() => { 
  render(
    <BrowserRouter>
    <Provider store={store}>
      <Application />
      </Provider>
      </BrowserRouter>
  );
})
describe('Тестирование хедера', () => {
    it('в шапке отображаются ссылки на страницы магазина, а также ссылка на корзину', () => {
    
      const catalog = screen.getByText('Catalog');
      const delivery = screen.getByText('Delivery')
      const contacts = screen.getByText('Contacts')
      const cart = screen.getByText('Cart')
     

      expect(catalog).toBeInTheDocument()
      expect(catalog).toHaveAttribute('href', '/catalog');
      expect(delivery).toBeInTheDocument()
      expect(delivery).toHaveAttribute('href', '/delivery');
      expect(contacts).toBeInTheDocument()
      expect(contacts).toHaveAttribute('href', '/contacts');
      expect(cart).toBeInTheDocument()
      expect(cart).toHaveAttribute('href', '/cart');
    });
    it('название магазина в шапке должно быть ссылкой на главную страницу', () => {
      const title = screen.getByText('Kogtetochka store')

      expect(title).toBeInTheDocument()
      expect(title).toHaveAttribute('href', '/');
    });
   
  // it('на ширине меньше 576px навигационное меню должно скрываться за "гамбургер", при выборе элемента из меню "гамбургера", меню должно закрываться', async () => {
  

     
      
  //   });
});