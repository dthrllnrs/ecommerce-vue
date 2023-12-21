import { defineStore } from 'pinia'
import api from '@/services/api';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    cartProducts: {},
  }),
  getters: {
    cartLength: (state) => Object.keys(state.cartProducts).length,
    cartTotal: ({ cartProducts }) => {
      let total = 0;
      for (const key in cartProducts) {
        const product = cartProducts[key];
        total = total + product.total;
      }
      return total;
    }
  },
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
    addProductToCart(cartProduct, quantity) {
      const { id, price } = cartProduct;
      if (this.cartProducts[id]) {
        this.cartProducts[id].quantity = this.cartProducts[id].quantity + quantity;
        this.cartProducts[id].total = this.cartProducts[id].quantity * price;
      } else {
        this.cartProducts[id] = {
          product: cartProduct,
          quantity,
          total: price,
        }
      }
    },
    modifyCartProductQuantity(cartProduct, quantity) {
      const { id, price } = cartProduct;
      this.cartProducts[id].quantity = quantity;
      this.cartProducts[id].total = quantity * price;
    },
    removeCartProduct(cartProduct) {
      const { id } = cartProduct;
      delete this.cartProducts[id];
    },
  },
});
