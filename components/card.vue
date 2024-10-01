<template>
  <div>
    <div
      class="w-full max-w-sm bg-white border border-gray-200 shadow rounded-xl dark:bg-gray-800 dark:border-gray-700"
    >
      <NuxtLink
        class="flex justify-center w-full bg-white rounded-t-xl"
        :to="`/product/${props.product.id}`"
      >
        <img
          class="p-8 rounded-t-lg w-60 h-60"
          :src="props.product.thumbnail"
          alt="product image"
        />
      </NuxtLink>

      <div class="px-5 pb-5">
        <h5
          class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white product-title"
        >
          {{ props.product.title }}
        </h5>

        <div class="flex items-center mt-2.5 mb-5">
          <div class="flex items-center space-x-1 rtl:space-x-reverse">
            <template v-for="(star, index) in stars" :key="index">
              <StarsFullStar v-if="star === 'full'" />
              <StarsHalfStar v-else-if="star === 'half'" />
              <StarsEmptyStar v-else />
            </template>
          </div>
          <span
            class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3"
            >{{ props.product.rating }}</span
          >
        </div>
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">
              $ {{ discountedPrice }}
            </span>

            <span class="text-sm font-medium text-red-600 dark:text-red-400">
              {{ Math.round(props.product.discountPercentage) }}% off
            </span>
          </div>

          <div
            v-if="props.product.discountPercentage > 0"
            class="text-sm text-gray-500 line-through dark:text-gray-400"
          >
            $ {{ props.product.price }}
          </div>

          <hr />

          <div
            v-if="isInCart()"
            class="flex items-center justify-between w-full gap-5 space-x-2"
          >
            <button
              @click="decrementQty()"
              class="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-3 py-1.5"
            >
              -
            </button>

            <span>{{ getCartQty(props.product.id) }}</span>

            <button
              @click="incrementQty()"
              class="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-3 py-1.5"
            >
              +
            </button>
          </div>

          <div
            v-else
            @click="handleAddToCart()"
            class="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/types/products";
import { useMyCartStore } from "../stores/cart";

const cart = useMyCartStore();

const handleAddToCart = () => {
  cart.addProductToCart(props.product);
};

const incrementQty = () => {
  cart.incrementItem(props.product.id);
};

const decrementQty = () => {
  const qty = getCartQty(props.product.id);
  if (qty > 1) {
    cart.decrementItem(props.product.id);
  } else {
    cart.removeProductFromCart(props.product.id);
  }
};

const isInCart = () => {
  return cart.listCart.some(
    (item) => item.productDetail.id === props.product.id
  );
};

const getCartQty = (productId: number) => {
  const productInCart = cart.listCart.find(
    (item) => item.productDetail.id === productId
  );
  return productInCart ? productInCart.qty : 0;
};

const stars = computed(() => {
  const fullStars = Math.floor(props.product.rating);
  const halfStar = props.product.rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return [
    ...Array(fullStars).fill("full"),
    ...Array(halfStar).fill("half"),
    ...Array(emptyStars).fill("empty"),
  ];
});

const discountedPrice = computed(() => {
  const price = props.product.price;
  const discount = props.product.discountPercentage;

  return (price - price * (discount / 100)).toFixed(2);
});

const props = defineProps<{
  product: Product;
}>();
</script>

<style scoped>
.product-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 3em;
  line-height: 1.5em;
}
</style>
