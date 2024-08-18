<script setup>
import {computed} from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  nullable: {
    type: Boolean,
    default: false,
  },
  options: {
    type: [Array, Object],
    default: () => [],
  },
  optionLabel: {
    type: String,
    default: "label",
  },
  optionValue: {
    type: String,
    default: "value",
  },
  placeholder: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const proxyModelValue = computed({
  get: () => props.modelValue,
  set: val => emit("update:modelValue", val),
});
</script>

<template>
  <select
    v-model="proxyModelValue"
    class="bg-white border border-gray-300 text-gray-800 placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
  >
    <option
      :value="null"
      selected
      :disabled="!nullable"
    >
      {{ placeholder }}
    </option>
    <option
      v-for="(option, index) in options"
      :key="index"
      :value="option[optionValue]"
    >
      {{ option[optionLabel] }}
    </option>
  </select>
</template>
