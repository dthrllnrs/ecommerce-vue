import { defineStore } from 'pinia'
import api from '@/services/api';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    cartProducts: {},
  }),
  actions: {
    async fetchProducts() {
      return new Promise((resolve, reject) => {
        api.get('products').then((response) => {
          const { data: products } = response.data;
          console.log(products);
          this.products = products;
          resolve(products);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    addProductToCart(cartProduct) {

    }
  },
});
