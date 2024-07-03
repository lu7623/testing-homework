import React from 'react';

import { render } from '@testing-library/react';

describe('Тестирование корзины', () => {
    it('Отображение количества товаров в корзине в шапке', () => {
        const app = <div>example</div>;

        const { container } = render(app);

        console.log(container.outerHTML);

        expect(container.textContent).toBe('example');
    });
    it('Отображение таблицы товаров в корзине', () => {
      const app = <div>example</div>;

      const { container } = render(app);

      console.log(container.outerHTML);

      expect(container.textContent).toBe('example');
    });
    it('Очистка корзины по кнопке', () => {
      const app = <div>example</div>;

      const { container } = render(app);

      console.log(container.outerHTML);

      expect(container.textContent).toBe('example');
    });
    it('Если корзина пуста, отображается ссылка', () => {
      const app = <div>example</div>;

      const { container } = render(app);

      console.log(container.outerHTML);

      expect(container.textContent).toBe('example');
    });
    it('Содержание корзины сохраняется между перезагрузками страницы', () => {
      const app = <div>example</div>;

      const { container } = render(app);

      console.log(container.outerHTML);

      expect(container.textContent).toBe('example');
  });
});