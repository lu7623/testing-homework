describe("Добавление товара в корзину", () => {
  it("При добавлении в корзину появляется надпись Item in cart", async ({
    browser,
  }) => {
    await browser.url("http://localhost:3000/hw/store/catalog");
    const link = await browser.$$(".ProductItem-DetailsLink")[2];
    await link.click();
    const addToCartBtn = await browser.$(".ProductDetails-AddToCart");
    await addToCartBtn.click();

    await expect(browser.$(".CartBadge")).toBeDisplayed();
  });
});

describe("Оформление заказа", () => {
  it("Заполнение формы и чекаут", async ({ browser }) => {
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
});
