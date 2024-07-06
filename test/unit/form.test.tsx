import React from "react";
import { initState, LocalStorageMock } from "../helper";
import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Cart } from "../../src/client/pages/Cart";
import axios from "axios";



beforeEach(() => { 
   
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
  render(
    <BrowserRouter>
    <Provider store={init}>
      <Cart />
      </Provider>
      </BrowserRouter>
  );
})

jest.mock("axios", () => ({
  post: jest
    .fn()
    .mockImplementation((x) => Promise.resolve({ data: {id: 1} })),
}));

describe('Тестирование формы', () => {
 
  it('Валидация полей при неправильном вводе телефона', async() => {

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
     expect(screen.queryByText('Please provide a valid phone')).toBeVisible()
   });
    
  });
  it('Валидация полей при верных данных', async() => {

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
     expect(screen.queryByText('Please provide a valid phone')).not.toBeInTheDocument()
   });
    
  });
 
 
  it('Показать сообщение об успехе при удачной обработке заказа', async() => {
    const nameField = screen.getByRole("textbox", { name: 'Name' });
    const phoneField = screen.getByRole("textbox", { name: 'Phone' });
    const addressField = screen.getByRole("textbox", { name: 'Address' });
   const checkout= screen.getByText('Checkout')
    await waitFor(() => {
      fireEvent.change(nameField, { target: { value: "lu" } });
      fireEvent.change(phoneField, { target: { value: "+90000000000" } });
      fireEvent.change(addressField, { target: { value: "Moscow" } });
    })

      fireEvent.click(checkout)
      await waitFor(() => {
     expect(screen.getByText('Well done!')).toBeInTheDocument();
     expect(screen.getByText('has been successfully completed.', {exact: false})).toBeInTheDocument();
   });
  });
  it('Очистить корзину после удачной обработки заказа', async() => {
    const nameField = screen.getByRole("textbox", { name: 'Name' });
    const phoneField = screen.getByRole("textbox", { name: 'Phone' });
    const addressField = screen.getByRole("textbox", { name: 'Address' });
   const checkout= screen.getByText('Checkout')
    await waitFor(() => {
      fireEvent.change(nameField, { target: { value: "lu" } });
      fireEvent.change(phoneField, { target: { value: "+90000000000" } });
      fireEvent.change(addressField, { target: { value: "Moscow" } });
    })


    let mockCheckoutData = {
      "form": {
          "name": "lu",
          "phone": "+90000000000",
          "address": "Moscow"
      },
      "cart": {
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
      }
}
    expect(axios.post).toHaveBeenLastCalledWith( '/hw/store/api/checkout',  mockCheckoutData, {"params": {"bug_id": undefined}} )

      fireEvent.click(checkout)
await waitFor (() => {
  expect(localStorage.getItem('example-store-cart')).toStrictEqual("{}")
})
      
  });
  it('Отправить данные после чекаута', async() => {
    const nameField = screen.getByRole("textbox", { name: 'Name' });
    const phoneField = screen.getByRole("textbox", { name: 'Phone' });
    const addressField = screen.getByRole("textbox", { name: 'Address' });
   const checkout= screen.getByText('Checkout')
    await waitFor(() => {
      fireEvent.change(nameField, { target: { value: "lu" } });
      fireEvent.change(phoneField, { target: { value: "+90000000000" } });
      fireEvent.change(addressField, { target: { value: "Moscow" } });
    })


    let mockCheckoutData = {
      "form": {
          "name": "lu",
          "phone": "+90000000000",
          "address": "Moscow"
      },
      "cart": {
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
      }
}
      
     await waitFor(() => {
      fireEvent.click(checkout)
     }) 
      expect(axios.post).toHaveBeenLastCalledWith( '/hw/store/api/checkout',  mockCheckoutData, 
        {"params": {"bug_id": undefined}} );
  });
 
});