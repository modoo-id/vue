<script setup>
import {Link} from "@inertiajs/vue3";

defineProps({
  href: String,
});
</script>

<template>
  <Link
    :href="href"
    class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
  >
    <slot />
  </Link>
</template>
