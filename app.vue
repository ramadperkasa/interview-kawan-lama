<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useFlowbite } from "./composables/useFlowbite";

onMounted(async () => {
  if (typeof window !== "undefined") {
    const { initModals } = await import("flowbite");

    useFlowbite(() => {
      initModals();
    });
  }
});
</script>

<style scoped></style>
