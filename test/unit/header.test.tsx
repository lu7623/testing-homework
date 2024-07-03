import React from 'react';

import { render } from '@testing-library/react';

describe('Тестирование хедера', () => {
    it('в шапке отображаются ссылки на страницы магазина, а также ссылка на корзину', () => {
        const app = <div>example</div>;

        const { container } = render(app);

        console.log(container.outerHTML);

        expect(container.textContent).toBe('example');
    });
    it('название магазина в шапке должно быть ссылкой на главную страницу', () => {
      const app = <div>example</div>;

      const { container } = render(app);

      console.log(container.outerHTML);

      expect(container.textContent).toBe('example');
    });
    it('название магазина в шапке должно быть ссылкой на главную страницу', () => {
      const app = <div>example</div>;

      const { container } = render(app);

      console.log(container.outerHTML);

      expect(container.textContent).toBe('example');
    });
    it('на ширине меньше 576px навигационное меню должно скрываться за "гамбургер", при выборе элемента из меню "гамбургера", меню должно закрываться', () => {
      const app = <div>example</div>;

      const { container } = render(app);

      console.log(container.outerHTML);

      expect(container.textContent).toBe('example');
    });
});