<script setup>
import classNames from "classnames";
import {computed} from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "info",
  },
  icon: {
    type: Boolean,
    default: false,
  },
  darkBg: {
    type: [Number, String],
    default: 800,
  },
});

const colors = {
  info: "text-blue-800 bg-blue-50 dark:text-blue-400",
  danger: "text-red-800 bg-red-50 dark:text-red-400",
  success: "text-green-800 bg-green-50 dark:text-green-400",
  warning: "text-yellow-800 bg-yellow-50 dark:text-yellow-300",
  dark: "text-gray-800 bg-gray-50 dark:text-gray-300",
};

const baseClasses = "flex items-center p-4 text-sm rounded-lg";

const classes = computed(() => {
  return classNames(baseClasses, {
    [colors[props.type]]: true,
    [`dark:bg-gray-${props.darkBg}`]: true,
  });
});
</script>

<template>
  <div
    :class="classes"
    role="alert"
  >
    <template v-if="icon">
      <svg
        class="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
        />
      </svg>
      <span class="sr-only">Info</span>
    </template>
    <div>
      <slot />
    </div>
  </div>
</template>
