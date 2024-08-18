<script setup>
import {computed} from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const proxyModelValue = computed({
  get: () => props.modelValue,
  set: val => emit("update:modelValue", val),
});
</script>

<template>
  <input
    v-model="proxyModelValue"
    type="checkbox"
    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
  />
</template>
