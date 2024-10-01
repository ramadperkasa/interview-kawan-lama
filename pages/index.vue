<template>
  <div>
    <div class="grid grid-cols-4 gap-4">
      <Card
        v-for="(item, index) in productList"
        :key="index"
        :id="item.id"
        :title="item.title"
        :price="item.price"
        :description="item.description"
        :image="item.images[0]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMyCartStore } from "../stores/cart";

const cart = useMyCartStore();

const productList = ref([]);

const onLoadData = () => {
  fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((data) => {
      productList.value = data.products;
    });
};

onLoadData();

onMounted(() => {
  cart.loadCartFromLocalStorage();
});
</script>

<style scoped></style>
