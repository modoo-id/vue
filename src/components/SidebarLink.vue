<script setup>
import {Link} from "@inertiajs/vue3";

defineProps({
  href: String,
  active: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <Link
    :href="href"
    class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
    :class="active ? 'bg-gray-100 dark:bg-gray-700' : ''"
  >
    <slot />
  </Link>
</template>
