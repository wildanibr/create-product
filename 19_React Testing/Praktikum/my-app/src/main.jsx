// eslint-disable-next-line no-unused-vars
import React from 'react'
import ReactDOM from 'react-dom/client'
import CreateProduct from './pages/create-product';
import "./styles/index.css";
import { Provider } from 'react-redux';
import store from '../src/utils/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}> {/* Wrap komponen utama dengan Provider */}
  <CreateProduct />
</Provider>,
)
