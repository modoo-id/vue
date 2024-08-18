<script setup>
import Checkbox from "./Checkbox.vue";
import InputError from "./InputError.vue";
import {uniqueId} from "lodash";
import {computed} from "vue";

const props = defineProps({
  id: {
    type: String,
    default() {
      return uniqueId("form-checkbox-");
    },
  },
  checked: {
    type: [Array, Boolean],
    default: false,
  },
  value: {
    default: null,
  },
  label: String,
  error: String,
});

const emit = defineEmits(["update:checked"]);

const proxyChecked = computed({
  get: () => props.checked,
  set: val => emit("update:checked", val),
});
</script>

<template>
  <div class="flex flex-col space-y-1">
    <div class="inline-flex items-center">
      <Checkbox
        :id="id"
        :value="props.value"
        v-model="proxyChecked"
        v-bind="$attrs"
      />
      <label
        :for="id"
        class="ml-2 text-xs leading-5 font-medium"
        >{{ label }}</label
      >
    </div>
    <InputError
      v-show="error"
      :message="error"
    />
  </div>
</template>
