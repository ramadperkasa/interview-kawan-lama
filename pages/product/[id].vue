<template>
  <div class="max-w-5xl p-4 mx-auto">
    <div class="flex flex-col space-y-4 md:flex-row md:space-x-6">
      <div class="md:w-1/3">
        <img
          :src="product?.thumbnail"
          :alt="product?.title"
          class="object-cover w-full rounded-lg shadow-md"
        />
      </div>

      <div class="md:w-2/3">
        <h1 class="mb-4 text-2xl font-bold">{{ product?.title }}</h1>

        <div class="flex items-center mb-4 space-x-2">
          <span class="text-lg font-semibold">${{ discountedPrice }}</span>
          <span
            v-if="product?.discountPercentage"
            class="text-sm font-medium text-red-600"
          >
            {{ product?.discountPercentage }}% off
          </span>
        </div>

        <p class="mb-4 text-gray-700">{{ product?.description }}</p>

        <p class="mb-2 text-sm text-gray-600">
          Brand: <strong>{{ product?.brand }}</strong>
        </p>
        <p class="mb-2 text-sm text-gray-600">
          Stock: <strong>{{ product?.stock }}</strong>
        </p>
        <p class="mb-2 text-sm text-gray-600">
          Rating: <strong>{{ product?.rating }} / 5</strong>
        </p>

        <div v-if="isInCart(product?.id)" class="flex items-center space-x-2">
          <button
            @click="decrementQty(product?.id)"
            class="px-3 py-1 text-white bg-red-500 rounded"
          >
            -
          </button>
          <input
            type="number"
            class="w-12 text-center border border-gray-300 rounded"
            :value="getCartQty(product?.id)"
            @input="updateQty(product?.id, $event?.target?.value)"
            readonly
          />
          <button
            @click="incrementQty(product?.id)"
            class="px-3 py-1 text-white bg-green-500 rounded"
          >
            +
          </button>
        </div>
        <button
          v-else
          @click="addToCart(product)"
          class="px-6 py-3 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>

    <div class="mt-8">
      <h2 class="mb-4 text-xl font-semibold">Customer Reviews</h2>
      <div v-if="product?.reviews.length">
        <div
          v-for="review in product?.reviews"
          :key="review.reviewerEmail"
          class="p-4 mb-4 bg-gray-100 rounded-lg"
        >
          <div class="flex items-center justify-between mb-2">
            <p class="font-bold">{{ review.reviewerName }}</p>
            <span class="text-sm text-gray-500">{{ review.rating }} / 5</span>
          </div>
          <p class="text-gray-600">{{ review.comment }}</p>
        </div>
      </div>
      <p v-else class="text-gray-500">No reviews available for this product.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useMyCartStore } from "@/stores/cart";

import type { Product } from "@/types/products";

const cart = useMyCartStore();

const product = ref<Product | null>(null);

const discountedPrice = computed(() => {
  if (product.value) {
    const discount =
      product.value.price * (product.value.discountPercentage / 100);
    return (product.value.price - discount).toFixed(2);
  }
  return null;
});

const route = useRoute();

const productId = route.params.id || 1;

const loadProductData = async () => {
  try {
    const { data, error } = await useAPI<Product>(`/products/${productId}`);

    if (error.value) {
      console.error("Error fetching product details:", error.value);
      return;
    }

    product.value = data.value;
  } catch (err) {
    console.error("Error loading product:", err);
  }
};

const addToCart = (product: Product | null) => {
  if (!product) return;
  cart.addProductToCart(product);
};

const isInCart = (productId: number | undefined) => {
  if (!productId) return false;
  return cart.listCart.some((item) => item.productDetail.id === productId);
};

const getCartQty = (productId: number | undefined) => {
  if (!productId) return 0;
  const productInCart = cart.listCart.find(
    (item) => item.productDetail.id === productId
  );
  return productInCart ? productInCart.qty : 0;
};

const updateQty = (productId: number | undefined, qty: any) => {
  if (!productId || !qty) return;

  if (qty > 0) {
    cart.updateProductQty(productId, qty);
  } else {
    cart.removeProductFromCart(productId);
  }
};

const incrementQty = (productId: number | undefined) => {
  if (!productId) return;
  cart.incrementItem(productId);
};

const decrementQty = (productId: number | undefined) => {
  if (!productId) return;
  if (getCartQty(productId) > 1) {
    cart.decrementItem(productId);
  } else {
    cart.removeProductFromCart(productId);
  }
};

onMounted(() => {
  cart.loadCartFromLocalStorage();

  nextTick(() => {
    loadProductData();
  });
});
</script>

<style scoped></style>
