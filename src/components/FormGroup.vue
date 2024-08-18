<script setup>
import InputError from "./InputError.vue";
import InputLabel from "./InputLabel.vue";
import {uniqueId} from "lodash";

defineProps({
  id: {
    type: String,
    default() {
      return uniqueId("form-text-input-");
    },
  },
  label: String,
  required: {type: Boolean, default: false},
  error: [String, Array],
});
</script>

<template>
  <div class="flex flex-col">
    <InputLabel
      v-if="label"
      :for="id"
      :required="required"
    >
      {{ label }}
    </InputLabel>
    <slot></slot>
    <div
      v-show="error"
      class="mt-1"
    >
      <template v-if="Array.isArray(error)">
        <InputError
          v-for="(err, index) in error"
          :key="index"
          :message="err"
        />
      </template>
      <InputError
        v-else
        :message="error"
      />
    </div>
  </div>
</template>
