<script setup>
import {Link} from "@inertiajs/vue3";

defineProps({
  as: {type: String, default: "link"},
  href: {type: String, default: null},
});
</script>

<template>
  <button
    v-if="as == 'button'"
    class="block w-full py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left"
  >
    <slot />
  </button>
  <Link
    v-else-if="as == 'link'"
    :href="href"
    class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
  >
    <slot />
  </Link>
  <Link
    v-else-if="as == 'a'"
    :href="href"
    class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
  >
    <slot />
  </Link>
  <div v-else>
    <slot />
  </div>
</template>
