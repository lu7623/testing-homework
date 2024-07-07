describe("Общие требования", async function () {
  it("При ширине меньше 576px появляется burger меню", async ({ browser }) => {
    await browser.url("http://localhost:3000/hw/store");
    await browser.setWindowSize(575, 500);

    await expect(browser.$(".Application-Toggler")).toBeDisplayed();
  });
  it("В магазине должна быть главная страница", async ({ browser }) => {
    await browser.url("http://localhost:3000/hw/store");

    const page = await browser.$(".Home");
    expect(page.isExisting());
  });
  it("В магазине должна быть страница доставки", async ({ browser }) => {
    await browser.url("http://localhost:3000/hw/store/delivery");

    const page = await browser.$(".Delivery");
    expect(page.isExisting());
  });
  it("В магазине должна быть страница контактов", async ({ browser }) => {
    await browser.url("http://localhost:3000/hw/store/contacts");

    const page = await browser.$(".Contacts");
    expect(page.isExisting());
  });
  it("В магазине должна быть страница каталога", async ({ browser }) => {
    await browser.url("http://localhost:3000/hw/store/catalog");

    const page = await browser.$(".Catalog");
    expect(page.isExisting());
  });
  it("В магазине должна быть страница товара", async ({ browser }) => {
    await browser.url("http://localhost:3000/hw/store/catalog/0");

    const page = await browser.$(".Product");
    expect(page.isExisting());
  });
  it("В магазине должна быть страница корзины", async ({ browser }) => {
    await browser.url("http://localhost:3000/hw/store/cart");

    const page = await browser.$(".Cart");
    expect(page.isExisting());
  });
});

describe("Отображение данных товаров", () => {
  it("Данные товара в каталоге соответствуют данным товара на странице деталей", async ({
    browser,
  }) => {
    await browser.url("http://localhost:3000/hw/store/catalog");

    const names = await Promise.all(
      await browser.$$(".ProductItem-Name").map((name) => name.getText())
    );
    const links = await browser.$$(".ProductItem-DetailsLink");
    const prices = await Promise.all(
      await browser.$$(".ProductItem-Price").map((price) => price.getText())
    );
    const images = await Promise.all(
      await browser.$$(".Image").map((img) => img.getAttribute("src"))
    );
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
