<script setup>
import {twMerge} from "tailwind-merge";
import {computed} from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "submit",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const defaultButtonClasses =
  "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";

const disabledButtonClasses = "opacity-50";

const buttonClasses = computed(() => {
  return twMerge(defaultButtonClasses, props.disabled ? disabledButtonClasses : "");
});
</script>

<template>
  <button
    :type="type"
    :class="buttonClasses"
  >
    <slot />
  </button>
</template>
