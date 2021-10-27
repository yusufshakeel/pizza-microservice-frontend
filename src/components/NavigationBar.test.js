import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavigationBar from './NavigationBar';

test('Should have brand name', () => {
  render(
    <BrowserRouter>
      <NavigationBar />
    </BrowserRouter>
  );
  expect(screen.getByText('PizzaPizza')).toBeInTheDocument();
});
