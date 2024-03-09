import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import ProductDetail from './ProductDetail';

test('renders ProductDetail component', async () => {
  render(
    <MemoryRouter initialEntries={['/product/1']}>
      <Route path="/product/:id">
        <ProductDetail />
      </Route>
    </MemoryRouter>
  );

  // Simulate API response
  await screen.findByText('Product Title');

  // Test if product detail is rendered
  expect(screen.getByText('Product Title')).toBeInTheDocument();
});
