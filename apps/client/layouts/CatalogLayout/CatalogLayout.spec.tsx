import { render } from '@testing-library/react';

import CatalogLayout from './CatalogLayout';

describe('CatalogLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CatalogLayout />);
    expect(baseElement).toBeTruthy();
  });
});
