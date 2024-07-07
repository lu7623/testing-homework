describe("Отображение данных товаров", () => {
  it("Данные товара в каталоге соответствуют данным товара на странице деталей", async ({
    browser,
  }) => {
    await browser.url("http://localhost:3000/hw/store/catalog");

    const names =await Promise.all(await browser.$$(".ProductItem-Name").map(name =>name.getText()))
    const links =await browser.$$(".ProductItem-DetailsLink")
    const prices = await Promise.all(await browser.$$(".ProductItem-Price").map(price =>price.getText()))
    const images = await Promise.all(await browser.$$(".Image").map(img =>img.getAttribute('src')))
    let length = links.length;

    expect(names.length).toEqual(length);
    expect(prices.length).toEqual(length);
    expect(images.length).toEqual(length);

    await links[links.length - 1].click();

    const detailsName = await browser.$(".ProductDetails-Name").getText();
    const detailsPrice = await browser.$(".ProductDetails-Price").getText();
    const detailsImage = await browser.$(".Image").getAttribute("src");

    expect(names[length - 1]).toEqual(detailsName);
    expect(prices[length - 1]).toEqual(detailsPrice);
    expect(images[length - 1]).toEqual(detailsImage);
  });
});

describe("Добавление товара в корзину", () => {
  it("При добавлении в корзину появляется надпись Item in cart", async ({
    browser,
  }) => {
    await browser.url("http://localhost:3000/hw/store/catalog");
    const links = await browser.$$(".ProductItem-DetailsLink");
    await links[links.length - 1].click();
    const addToCartBtn = await browser.$(".ProductDetails-AddToCart");
    await addToCartBtn.click();

    await expect(browser.$(".CartBadge")).toBeDisplayed();
  });
});

describe("Оформление заказа", () => {
  it("После заполнения формы и чекаута появляется сообщение об успехе", async ({ browser }) => {
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
