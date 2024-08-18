<script setup>
import InputLabel from "./InputLabel.vue";
import {uniqueId} from "lodash";

defineProps({
  id: {
    type: String,
    default() {
      return uniqueId("form-textarea-input-");
    },
  },
  modelValue: String,
  label: String,
  error: [String, Array],
  placeholder: {type: String, default: null},
  required: {type: Boolean, default: false},
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex flex-col space-y-1">
    <InputLabel
      v-if="label"
      :for="id"
    >
      {{ label }}
      <span
        v-if="required"
        class="text-red-500"
        >(*)</span
      >
    </InputLabel>
    <textarea
      :id="id"
      :invalid="!!error"
      :value="modelValue"
      :placeholder="placeholder"
      @input="emit('update:modelValue', $event.target.value)"
      ref="input"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      v-bind="$attrs"
    />
    <div v-show="error">
      <template v-if="Array.isArray(error)">
        <p
          v-for="(err, index) in error"
          :key="index"
          class="text-xs text-red-600"
        >
          {{ err }}
        </p>
      </template>
      <p
        v-else
        class="text-xs text-red-600"
      >
        {{ error }}
      </p>
    </div>
  </div>
</template>
