<script setup>
import classNames from "classnames";
import {computed} from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "default",
  },
  size: {
    type: String,
    default: "default",
  },
  bordered: {
    type: Boolean,
    default: false,
  },
  pills: {
    type: Boolean,
    default: false,
  },
});

const colors = {
  default: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  dark: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
  info: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  danger: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

const baseClasses = `text-xs font-medium me-2 px-2.5 py-0.5 rounded`;
const borderedClasses = "border border-blue-400";
const pillsClasses = "rounded-full";

const classes = computed(() => {
  return classNames(baseClasses, {
    [colors[props.type]]: true,
    [borderedClasses]: props.bordered,
    [pillsClasses]: props.pills,
  });
});
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
