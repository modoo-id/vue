<script setup>
import Modal from "./Modal.vue";
import {ExclamationCircleIcon} from "@heroicons/vue/24/outline";

const emit = defineEmits(["close"]);

defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  maxWidth: {
    type: String,
    default: "2xl",
  },
  closeable: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    default: "warning",
  },
});

const close = () => {
  emit("close");
};
</script>

<template>
  <Modal
    :show="show"
    :max-width="maxWidth"
    :closeable="closeable"
    @close="close"
  >
    <div class="bg-white dark:bg-gray-700">
      <div class="p-4 md:p-5 text-center">
        <ExclamationCircleIcon
          v-if="type === 'warning'"
          class="mx-auto mb-4 text-gray-400 w-16 h-16 dark:text-gray-200"
        />
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          <slot name="content" />
        </h3>
        <slot name="footer" />
      </div>
    </div>
  </Modal>
</template>
