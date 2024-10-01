<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div
      class="flex items-center justify-between w-full max-w-screen-xl p-4 mx-auto"
    >
      <div class="flex">
        <NuxtLink
          to="/"
          class="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsF-vd1EploJDgKXMK33CO7X9daKcjNtlR-Rz56FUUb2M1rrWS277ofEf8sCgh1iBNY_Q&usqp=CAU"
            class="h-8"
            alt="Flowbite Logo"
          />
          <span
            class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
            >Kawan Lama Shop</span
          >
        </NuxtLink>
      </div>

      <button
        data-collapse-toggle="navbar-default"
        type="button"
        class="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <div class="flex-grow px-10">
        <form class="mx-auto">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >Search</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3"
            >
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search products here..."
              required
            />
            <button
              type="submit"
              class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="flex flex-col items-center p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li class="ml-3">
            <div class="relative">
              <NuxtLink
                to="/cart"
                class="block px-1 py-2 text-white rounded md:bg-transparent md:text-gray-600 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
              >
                <Icon class="w-7 h-7" name="material-symbols:shopping-cart" />
              </NuxtLink>

              <div
                v-if="cart.listCart.length > 0"
                class="absolute top-[-10px] right-[-10px] flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full"
              >
                <span>
                  {{ cart.listCart.length }}
                </span>
              </div>
            </div>
          </li>

          <li class="ml-3">
            <NuxtLink
              to="/"
              class="block px-1 py-2 text-gray-600 rounded cursor-pointer dark:text-white md:dark:text-gray-600"
            >
              Login
            </NuxtLink>
          </li>
          <li class="ml-3">
            <NuxtLink
              to="/"
              class="block px-1 py-2 text-gray-600 rounded cursor-pointer dark:text-white md:dark:text-gray-600"
            >
              Register
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const cart = useMyCartStore();
</script>

<style scoped></style>
