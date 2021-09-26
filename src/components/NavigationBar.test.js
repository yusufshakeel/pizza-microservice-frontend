import { render, screen } from '@testing-library/react';
import NavigationBar from './NavigationBar';

test('Should have brand name', () => {
  render(<NavigationBar />);
  expect(screen.getByText('PizzaPizza')).toBeInTheDocument();
});
