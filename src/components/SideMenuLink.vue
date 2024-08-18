<script setup>
import {Link} from "@inertiajs/vue3";

defineProps({
  href: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <Link
    :href="href"
    class="flex w-full space-x-1 items-center"
  >
    <div
      class="w-1 h-6 rounded-sm"
      :class="active ? 'bg-blue-700' : 'bg-transparent'"
    />
    <div
      class="flex-1 flex space-x-2 items-center hover:bg-gray-200 py-1.5 px-2 rounded font-medium text-gray-700 dark:text-white"
      :class="{'bg-white dark:bg-gray-700 font-bold text-black dark:text-white': active}"
    >
      <i
        v-if="icon"
        :class="icon"
      />
      <span><slot /></span>
    </div>
  </Link>
</template>
