/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CreateProduct from '../pages/create-product';
import { updateProductName } from '../utils/action';

const mockStore = configureStore([]);
let store;

beforeEach(() => {
  store = mockStore({});
});

test.only('seharusnya mengupdate input nama produk dengan benar', () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <CreateProduct />
    </Provider>
  );

  const productNameInput = getByLabelText('Product Name');
  fireEvent.change(productNameInput, { target: { value: 'Contoh Produk' } });

  
  const actions = store.getActions();
  

  expect(actions).toEqual([updateProductName('Contoh Produk')]);
});
