<script setup>
defineProps({
  noPadding: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    :class="{
      'p-6': !noPadding,
    }"
  >
    <slot />
  </div>
</template>
