import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/components/App.jsx';

describe('App', () => {
  describe('Rendering', () => {
    it('renders the app component', () => {
      render(<App />);
      const linkElement = screen.getByText(/Damage Log Scanner/i);
      expect(linkElement).toBeInTheDocument();
    });
  });
});
