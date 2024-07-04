import React from "react";
import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Cart } from "../../src/client/pages/Cart";
import { cart, store } from "./helper.test";


beforeEach(() => { 
  render(
    <BrowserRouter>
    <Provider store={store}>
      <Cart />
      </Provider>
      </BrowserRouter>
  );
})

jest.mock("axios", () => ({
  post: jest
    .fn()
    .mockImplementation(() => Promise.resolve({ data: {id: 1} })),
}));

describe('Тестирование формы', () => {
 
  it('Валидация полей', async() => {

    const nameField = screen.getByRole("textbox", { name: 'Name' });
    const phoneField = screen.getByRole("textbox", { name: 'Phone' });
    const addressField = screen.getByRole("textbox", { name: 'Address' });
   const checkout= screen.getByText('Checkout')
    await waitFor(() => {
      fireEvent.change(nameField, { target: { value: "lu" } });
      fireEvent.change(phoneField, { target: { value: ")" } });
      fireEvent.change(addressField, { target: { value: "Moscow)" } });
    })

      fireEvent.click(checkout)
      await waitFor(() => {
     expect(screen.getByText('Please provide a valid phone')).toBeVisible()
   });
    
  });
 
 
  it('Чекаут заказа', async() => {
    const nameField = screen.getByRole("textbox", { name: 'Name' });
    const phoneField = screen.getByRole("textbox", { name: 'Phone' });
    const addressField = screen.getByRole("textbox", { name: 'Address' });
   const checkout= screen.getByText('Checkout')
    await waitFor(() => {
      fireEvent.change(nameField, { target: { value: "lu" } });
      fireEvent.change(phoneField, { target: { value: "+90000000000" } });
      fireEvent.change(addressField, { target: { value: "Moscow)" } });
    })

      fireEvent.click(checkout)
      await waitFor(() => {
     expect(screen.getByText('Well done!')).toBeInTheDocument();
     expect(screen.getByText('has been successfully completed.', {exact: false})).toBeInTheDocument();
   });
  });
 
});