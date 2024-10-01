<template>
  <div class="w-full p-4 mx-auto">
    <h1 class="mb-6 text-3xl font-semibold">Shopping Cart</h1>

    <div v-if="cartItems.length === 0" class="text-center text-gray-500">
      <p>Your cart is empty.</p>
    </div>

    <div v-else>
      <div class="grid grid-cols-4 gap-5">
        <div class="col-span-3 space-y-4">
          <div
            v-for="item in cartItems"
            :key="item.productDetail.id"
            class="grid items-center justify-between grid-cols-7 p-4 bg-white shadow rounded-xl"
          >
            <div class="flex items-center col-span-4 space-x-4">
              <img
                :src="item.productDetail.thumbnail"
                alt="Product Image"
                class="object-cover w-16 h-16 rounded-lg"
              />
              <div>
                <h2 class="text-lg font-semibold">
                  {{ item.productDetail.title }}
                </h2>
                <p class="text-sm text-gray-500">
                  ${{ item.productDetail.price }}
                </p>
              </div>
            </div>

            <div class="flex items-center col-span-1 mr-5">
              <button
                @click="decrementQty(item.productDetail.id)"
                class="px-3 py-1 text-white bg-red-500 rounded"
              >
                -
              </button>
              <input
                type="number"
                class="w-12 mx-2 text-center border border-gray-300 rounded"
                v-model.number="item.qty"
                @input="updateQty(item.productDetail.id, item.qty)"
              />
              <button
                @click="incrementQty(item.productDetail.id)"
                class="px-3 py-1 text-white bg-blue-500 rounded"
              >
                +
              </button>
            </div>
            <div class="flex items-center justify-end col-span-2 gap-3">
              <div class="pl-5 text-lg font-semibold">
                ${{ (item.qty * item.productDetail.price).toFixed(2) }}
              </div>

              <button
                @click="openModal(item.productDetail.id)"
                class="text-white bg-white hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-1.5 py-1.5 text-center"
              >
                <Icon name="mdi-delete" class="w-5 h-5 text-red-700" />
              </button>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col items-center col-span-1 p-4 bg-white rounded-lg shadow h-min"
        >
          <h2 class="mb-4 text-2xl font-semibold">Cart Summary</h2>

          <div class="text-lg font-semibold">
            Subtotal: ${{ cartTotal.toFixed(2) }}
          </div>

          <div class="text-lg font-semibold">Shipping: $0.00</div>

          <div class="text-lg font-semibold">Tax: $0.00</div>

          <hr class="w-full my-4 border-gray-200" />

          <div class="text-lg font-semibold">
            Total: ${{ cartTotal.toFixed(2) }}
          </div>

          <button
            class="px-6 py-3 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>

  <AlertDeleteProduct v-model="isModalOpen" @confirm="removeItem" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useMyCartStore } from "@/stores/cart";

const cart = useMyCartStore();

const isModalOpen = ref(false);

const activeProduct = ref<number | null>(null);

const openModal = (productId: number) => {
  activeProduct.value = productId;
  isModalOpen.value = true;
};

const discountedPrice = (price: number, discount: number) => {
  const discountAmount = price * (discount / 100);
  return (price - discountAmount).toFixed(2);
};

const cartItems = computed(() => cart.listCart);

const cartTotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + item.qty * item.productDetail.price;
  }, 0);
});

const incrementQty = (productId: number) => {
  cart.incrementItem(productId);
};

const decrementQty = (productId: number) => {
  const item = cart.listCart.find((i) => i.productDetail.id === productId);
  if (item && item.qty > 1) {
    cart.decrementItem(productId);
  } else {
    openModal(productId);
  }
};

const updateQty = (productId: number, qty: number) => {
  if (qty > 0) {
    cart.updateProductQty(productId, qty);
  } else {
    cart.removeProductFromCart(productId);
  }
};

const removeItem = () => {
  if (activeProduct.value === null) return;
  cart.removeProductFromCart(activeProduct.value);
};
onMounted(() => {
  cart.loadCartFromLocalStorage();
});
</script>

<style scoped>
.space-y-4 > * + * {
  margin-top: 1rem;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
