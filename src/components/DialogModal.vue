<script setup>
import Modal from "./Modal.vue";

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
    <div class="">
      <!-- Modal header -->
      <div
        class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
      >
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          <slot name="title" />
        </h3>
      </div>

      <!-- Modal body -->
      <div class="p-4 md:p-5 space-y-4 dark:text-gray-100">
        <slot name="content" />
      </div>
    </div>

    <!-- Modal footer -->
    <div
      class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
    >
      <slot name="footer" />
    </div>
  </Modal>
</template>
