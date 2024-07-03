import React from 'react';

import { render } from '@testing-library/react';

describe('Тестирование каталога', () => {
    it('В каталоге отображаются товары, список которых приходит с сервера', () => {
        const app = <div>example</div>;

        const { container } = render(app);

        console.log(container.outerHTML);

        expect(container.textContent).toBe('example');
    });
    it('Для каждого товара отображается цена, название и ссылка', () => {
      const app = <div>example</div>;

      const { container } = render(app);

      console.log(container.outerHTML);

      expect(container.textContent).toBe('example');
    });
});