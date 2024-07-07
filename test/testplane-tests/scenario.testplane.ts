import axios from "axios";
let bug_id = "";

if (process.env.BUG_ID !== undefined) {
  bug_id = process.env.BUG_ID;
}


describe("Добавление товара в корзину", () => {
  it("При добавлении в корзину появляется надпись Item in cart", async ({
    browser,
  }) => {
    await browser.url("http://localhost:3000/hw/store/catalog");
    
    const links = await browser.$$(".ProductItem-DetailsLink");
    await links[0].click();
    const addToCartBtn = await browser.$(".ProductDetails-AddToCart");
    await addToCartBtn.click();

    await expect(browser.$(".CartBadge")).toBeDisplayed();
  });
});

describe("Оформление заказа", () => {
  it("После заполнения формы и чекаута появляется сообщение об успехе", async ({
    browser,
  }) => {
    await browser.url("http://localhost:3000/hw/store/cart");
    const name = await browser.$("#f-name");
    await name.setValue("lu");
    const phone = await browser.$("#f-phone");
    await phone.setValue("+900000000000");
    const address = await browser.$("#f-address");
    await address.setValue("Moscow");
    const checkout = await browser.$(".Form-Submit");
    await checkout.click();

    await expect(browser.$(".alert-success")).toBeDisplayed();
    await expect(browser.$("p")).toHaveText(
      "Order #1 has been successfully completed."
    );
  });
  it("При оформлении заказа возвращается верный id", async ({}) => {
    const mockData = {
      name: "lu",
      phone: "+90000000000",
      address: "Moscow",
    };

    const mockCart = {
      0: { id: 0, name: "Incredible Kogtetochka", price: 400, count: 1 },
      1: { id: 1, name: "Rustic Kogtetochka", price: 200, count: 3 },
    };

    const order = {
      form: mockData,
      cart: mockCart,
    };

    const response = await axios.post(
      `http://localhost:3000/hw/store/api/checkout?bug_id=${bug_id}`,
      order
    );
    const orderId = response.data.id;

    const orders = await axios.get(`http://localhost:3000/hw/store/api/orders`);
    expect(orderId).toEqual(orders.data.length);
  });
});
