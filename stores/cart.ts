import { defineStore } from "pinia";
import type { Product } from "~/types/products";
interface CartItem {
  id: number;
  qty: number;
  productDetail: Product;
}

export const useMyCartStore = defineStore({
  id: "myCartStore",
  state: () => ({
    listCart: [] as CartItem[],
  }),
  actions: {
    addProductToCart(product: Product) {
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

      this.saveCartToLocalStorage();
    },

    removeProductFromCart(productId: number) {
      const existingProductIndex = this.listCart.findIndex(
        (item) => item.productDetail.id === productId
      );

      if (existingProductIndex !== -1) {
        this.listCart.splice(existingProductIndex, 1);
      }

      this.saveCartToLocalStorage();
    },

    incrementItem(productId: number) {
      const existingProduct = this.listCart.find(
        (item) => item.productDetail.id === productId
      );

      if (existingProduct) {
        existingProduct.qty += 1;
      }

      this.saveCartToLocalStorage();
    },

    decrementItem(productId: number) {
      const existingProduct = this.listCart.find(
        (item) => item.productDetail.id === productId
      );

      if (existingProduct) {
        if (existingProduct.qty > 1) {
          existingProduct.qty -= 1;
        } else {
          this.removeProductFromCart(existingProduct.productDetail.id);
        }
      }

      this.saveCartToLocalStorage();
    },

    saveCartToLocalStorage() {
      localStorage.setItem("listCart", JSON.stringify(this.listCart));
    },

    updateProductQty(productId: number, qty: number) {
      const productInCart = this.listCart.find(
        (item) => item.productDetail.id === productId
      );
      if (productInCart) {
        productInCart.qty = qty;
      }
      this.saveCartToLocalStorage();
    },

    loadCartFromLocalStorage() {
      if (typeof window !== "undefined") {
        const storedCart = localStorage.getItem("listCart");
        if (storedCart) {
          this.listCart = JSON.parse(storedCart);
        }
      }
    },
  },
});
