import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';

test('renders Home component', async () => {
  render(<Home />);
  
  // Test loading state
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // Simulate API response
  await screen.findByText('Product Title');

  // Test if products are rendered
  expect(screen.getByText('Product Title')).toBeInTheDocument();
});

test('filters products by category', async () => {
  render(<Home />);
  
  // Simulate API response
  await screen.findByText('Product Title');

  // Filter by category
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'electronics' } });

  // Test if filtered products are rendered
  expect(screen.getByText('Electronics')).toBeInTheDocument();
});
