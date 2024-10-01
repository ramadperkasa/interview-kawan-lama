<template>
  <div>
    <div class="flex flex-col gap-3 w-full">
      <h1 class="text-2xl font-bold">Cart</h1>

      <Cart
        v-for="(item, index) in cart.listCart"
        :key="index"
        :id="item.id"
        :qty="item.qty"
        :productDetail="item.productDetail"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMyCartStore } from "../stores/cart";

const cart = useMyCartStore();

onMounted(() => {
  cart.loadCartFromLocalStorage();
});
</script>

<style></style>
