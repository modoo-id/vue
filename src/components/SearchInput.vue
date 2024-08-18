<script setup>
import TextInput from "./TextInput.vue";
import {MagnifyingGlassIcon} from "@heroicons/vue/24/outline";
import {computed} from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const proxyModelValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <div class="relative w-full">
    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <MagnifyingGlassIcon class="w-4 h-4 text-gray-500 dark:text-gray-400" />
    </div>
    <TextInput
      v-model="proxyModelValue"
      type="text"
      class="pl-10"
      placeholder="Search"
    />
  </div>
</template>
