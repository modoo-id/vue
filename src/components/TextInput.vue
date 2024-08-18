<script setup>
import {twMerge} from "tailwind-merge";
import {computed, nextTick, onMounted, ref} from "vue";

const props = defineProps({
  modelValue: String,
  size: {
    type: String,
    default: "default",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  invalid: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);

const defaultInputClasses =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

const disabledInputClasses = "cursor-not-allowed bg-gray-100";

const inputSizeClasses = {
  large: "p-4",
  default: "p-2.5 text-sm",
  small: "p-2 text-sm",
};

const errorInputClasses =
  "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";

const inputClasses = computed(() => {
  const classByStatus = props.invalid ? errorInputClasses : "";

  return twMerge(
    defaultInputClasses,
    classByStatus,
    inputSizeClasses[props.size],
    props.disabled ? disabledInputClasses : ""
  );
});

const input = ref(null);

onMounted(() => {
  if (input.value.hasAttribute("autofocus")) {
    nextTick(() => input.value.focus());
  }
});

defineExpose({focus: () => input.value.focus()});
</script>

<template>
  <input
    ref="input"
    :class="inputClasses"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
