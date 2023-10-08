import { createStore } from 'redux';
import{ productReducer } from './productReducer';

const store = createStore(productReducer);

export default store;
