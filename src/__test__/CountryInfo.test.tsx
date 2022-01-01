import React from 'react';
import { render, screen } from '@testing-library/react';
import CountryInfo from '../components/CountryInfo';
import {createMemoryHistory} from "history";
import { Router } from 'react-router-dom';

test('renders country', () => {

  const history = createMemoryHistory();

  history.push(`/exam/:name`)

  render(
      <Router history={history}>
          <CountryInfo/>
      </Router>
  );
  const country = screen.getByTestId("country");
  expect(country).toBeInTheDocument();
});