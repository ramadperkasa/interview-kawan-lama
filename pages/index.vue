<template>
  <div>
    <div class="grid grid-cols-5 gap-4">
      <Card v-for="(item, index) in productList" :key="index" :product="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMyCartStore } from "../stores/cart";

import type { Product } from "@/types/products";

const cart = useMyCartStore();

const productList = ref<Product[]>([]);

interface FetchProductsResponse {
  products: Product[];
}

const onLoadData = async () => {
  const { data, error } = await useAPI<FetchProductsResponse>("/products");

  if (error.value) {
    console.error("Error fetching products:", error.value);
    return;
  }

  productList.value = data.value?.products ?? [];
};

onLoadData();

onMounted(() => {
  cart.loadCartFromLocalStorage();
});
</script>
