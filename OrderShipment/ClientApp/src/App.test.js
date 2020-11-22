import React from 'react';
import { shallow, mount} from "enzyme";
import {render, screen} from '@testing-library/react';
import { Home } from './components/Home';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

it('renders without crashing', async () => {
  shallow(<App />);
});

it('should show Home component for / router (using memory router)', () => {
  const component = mount(
  <MemoryRouter initialentries="{['/']}">
    <App />
  </MemoryRouter>
  );
  expect(component.find(Home)).toHaveLength(1);
})

it('should show Fetch Data link', () => {
  const path = "/fetch-data"
  const component = render(
  <MemoryRouter initialentries="{['']}">
    <App />
  </MemoryRouter>
  );

  const fetchDataLink = screen.getByText('Fetch data');
  const link =  fetchDataLink.getAttribute('href');
  expect(link).toBe(path);

})

it('should show Shipment link', () => {
  const path = "/create-shipment";
  const component = render(
  <MemoryRouter initialentries="{['']}">
    <App />
  </MemoryRouter>
  );

  const fetchDataLink = screen.getByText('Shipment');
  const link =  fetchDataLink.getAttribute('href');
  expect(link).toBe(path);

})

it('should show Order link', () => {
  const path = "/create-order";
  const component = render(
  <MemoryRouter initialentries="{['']}">
    <App />
  </MemoryRouter>
  );

  const fetchDataLink = screen.getByText('Order');
  const link =  fetchDataLink.getAttribute('href');
  expect(link).toBe(path);

})