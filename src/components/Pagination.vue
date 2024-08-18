<script setup>
import Button from "./Button.vue";
import TextButton from "./TextButton.vue";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/vue/24/outline";

const props = defineProps({
  data: {
    type: Object,
  },
});

const emit = defineEmits(["paginate"]);

function change(page) {
  if (page === 0 && props.data.current_page > 1) {
    page = props.data.current_page - 1;
  }

  if (page >= props.data.last_page && props.data.current_page < props.data.last_page) {
    page = props.data.current_page + 1;
  }

  if (page < 1) {
    page = null;
  }

  if (page > props.data.last_page) {
    page = props.data.last_page;
  }

  emit("paginate", page);
}

function next() {
  change(props.data.current_page + 1);
}

function previous() {
  change(props.data.current_page - 1);
}
</script>

<template>
  <div class="flex flex-col md:flex-row gap-y-4 md:gap-y-0 justify-between items-start py-3">
    <div class="flex items-center">
      <TextButton @click="previous">
        <ChevronLeftIcon class="w-5 h-5" />
      </TextButton>
      <TextButton @click="next">
        <ChevronRightIcon class="w-5 h-5" />
      </TextButton>
      <div class="ms-2 text-sm text-gray-700 dark:text-gray-300">
        Showing
        <span class="font-bold dark:text-white">{{ data.from }}-{{ data.to }}</span>
        of
        <span class="font-bold dark:text-white">{{ data.total }}</span>
      </div>
    </div>
    <div class="flex items-center w-full md:w-auto">
      <Button
        @click="previous"
        class="flex-1 justify-center"
        :disabled="data.current_page === 1"
      >
        <template #prefix>
          <ChevronLeftIcon class="w-4 h-4" />
        </template>
        Previous
      </Button>
      <Button
        class="ms-2 flex-1 justify-center"
        @click="next"
        :disabled="data.current_page === data.last_page"
      >
        Next
        <template #suffix>
          <ChevronRightIcon class="w-4 h-4" />
        </template>
      </Button>
    </div>
  </div>
</template>
