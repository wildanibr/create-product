import { UPDATE_PRODUCT } from './actionTypes';

export const updateProduct = (productId, updatedProductData) => {
  return {
    type: UPDATE_PRODUCT,
    payload: {
      productId,
      updatedProductData,
    },
  };
};

export const addProduct = (product) => ({
    type: 'ADD_PRODUCT',
    payload: product,
  });
  
  export const deleteProduct = (productId) => ({
    type: 'DELETE_PRODUCT',
    payload: productId,
  });
  
  export const editProduct = (productId, updatedProduct) => {
    return {
      type: "EDIT_PRODUCT",
      payload: { productId, updatedProduct },
    };
  };
  