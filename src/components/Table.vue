<script setup>
import {provide} from "vue";

const props = defineProps({
  striped: {
    type: Boolean,
    default: false,
  },
  stripedColumns: {
    type: Boolean,
    default: false,
  },
  hoverable: {
    type: Boolean,
    default: false,
  },
});

provide("hoverable", props.hoverable);
provide("striped", props.striped);
provide("stripedColumns", props.stripedColumns);
</script>

<template>
  <div class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
    <div
      v-if="$slots.header"
      class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
    >
      <slot name="header" />
    </div>
    <div class="overflow-x-auto shadow-md">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <slot />
      </table>
    </div>
  </div>
</template>
