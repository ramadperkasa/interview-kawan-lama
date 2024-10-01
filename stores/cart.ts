import { defineStore } from "pinia";

export const useMyCartStore = defineStore({
  id: "myCartStore",
  state: () => ({
    listCart: [],
  }),
  actions: {
    addProductToCart(product: any) {
      const existingProduct = this.listCart.find(
        (item) => item.productDetail.id === product.id
      );

      if (existingProduct) {
        existingProduct.qty += 1;
      } else {
        this.listCart.push({
          id: this.listCart.length + 1,
          qty: 1,
          productDetail: product,
        });
      }

      this.saveCartToLocalStorage(); // Save to local storage
    },

    removeProductFromCart(productId: any) {
      const existingProductIndex = this.listCart.findIndex(
        (item) => item.productDetail.id === productId
      );

      if (existingProductIndex !== -1) {
        this.listCart.splice(existingProductIndex, 1);
      }

      this.saveCartToLocalStorage(); // Save to local storage
    },

    incrementItem(productId: any) {
      const existingProduct = this.listCart.find(
        (item) => item.id === productId
      );

      if (existingProduct) {
        existingProduct.qty += 1;
      }

      this.saveCartToLocalStorage(); // Save to local storage
    },

    decrementItem(productId: any) {
      const existingProduct = this.listCart.find(
        (item) => item.id === productId
      );

      if (existingProduct) {
        if (existingProduct.qty > 1) {
          existingProduct.qty -= 1;
        } else {
          this.removeProductFromCart(existingProduct.productDetail.id);
        }
      }

      this.saveCartToLocalStorage(); // Save to local storage
    },

    saveCartToLocalStorage() {
      localStorage.setItem("listCart", JSON.stringify(this.listCart));
    },

    loadCartFromLocalStorage() {
      if (typeof window !== "undefined") {
        // Check if we're in the browser
        const storedCart = localStorage.getItem("listCart");
        if (storedCart) {
          this.listCart = JSON.parse(storedCart);
        }
      }
    },
  },
});
