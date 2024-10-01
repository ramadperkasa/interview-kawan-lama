<template>
  <div>
    {{ props.title }}
    <div
      class="w-100 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <img
        class="w-40 h-40 object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        :src="props.productDetail.image"
        alt=""
      />
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ props.productDetail.title }}
        </h5>
      </div>

      <div class="flex flex-col text-2xl font-semibold">
        <div>QTY :</div>
        <div>
          <button
            @click="cart.decrementItem(props.id)"
            class="px-2 py-1 bg-gray-200 rounded-lg"
          >
            -
          </button>
          <span class="px-2 py-1">{{ props.qty }}</span>
          <button
            @click="cart.incrementItem(props.id)"
            class="px-2 py-1 bg-gray-200 rounded-lg"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMyCartStore } from "../stores/cart";

const cart = useMyCartStore();

const props = defineProps<{
  id: string;
  qty: number;
  productDetail: Object;
}>();
</script>

<style></style>
