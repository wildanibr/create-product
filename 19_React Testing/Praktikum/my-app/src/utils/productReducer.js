/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-case-declarations */

import { UPDATE_PRODUCT } from "./actionTypes";

const initialState = {
  productList: [], // Isi dengan data awal yang sesuai
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      // Logika untuk menambah produk ke state
      return { ...state, productList: [...state.productList, action.payload] };
    case "DELETE_PRODUCT":
      // Logika untuk menghapus produk dari state
      return {
        ...state,
        productList: state.productList.filter(
          (product) => product.id !== action.payload
        ),
      };
    case "EDIT_PRODUCT":
      // Logika untuk mengedit produk dalam state
      const { productId, updatedProduct } = action.payload;
      const updatedProductList = state.productList.map((product) =>
        product.id === productId ? updatedProduct : product
      );
      return { ...state, productList: updatedProductList };
    case "UPDATE_PRODUCT":
      // Logika untuk memperbarui produk dalam state
      const { updatedProductId, updatedData } = action.payload;
      return {
        ...state,
        productList: state.productList.map((product) =>
          product.id === updatedProductId ? { ...product, ...updatedData } : product
        ),
      };
    default:
      return state;
  }
};
