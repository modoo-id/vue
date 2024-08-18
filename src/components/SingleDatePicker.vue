<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import dayjs from "dayjs";
import {ref} from "vue";
import {computed} from "vue";

const props = defineProps({
  modelValue: {
    type: String,
  },
  placeholder: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const proxyModelValue = computed({
  get: () => props.modelValue,
  set: val => {
    emit("update:modelValue", val);
  },
});

const isDarkMode = computed(
  () =>
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
);

const presetDates = ref([
  {label: "Today", value: new Date()},
  {
    label: "Yesterday",
    value: dayjs().subtract(1, "day").toDate(),
  },
  {
    label: "1 Week ago",
    value: dayjs().subtract(1, "week").toDate(),
  },
  {
    label: "1 Month ago",
    value: dayjs().subtract(1, "month").toDate(),
  },
  {
    label: "1 Year ago",
    value: dayjs().subtract(1, "year").toDate(),
  },
]);
</script>

<template>
  <div>
    <VueDatePicker
      v-model="proxyModelValue"
      model-type="yyyy-MM-dd"
      format="yyyy-MM-dd"
      :clearable="false"
      auto-apply
      :enable-time-picker="false"
      :preset-dates="presetDates"
      :dark="isDarkMode"
    >
      <template
        #dp-input="{
          value,
          onInput,
          onEnter,
          onTab,
          onClear,
          onBlur,
          onKeypress,
          onPaste,
          isMenuOpen,
        }"
      >
        <div class="relative max-w-sm">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
              />
            </svg>
          </div>
          <input
            :value="value"
            :placeholder="placeholder"
            :disabled="disabled"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </template>
    </VueDatePicker>
  </div>
</template>
