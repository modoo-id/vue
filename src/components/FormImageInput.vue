<script setup>
import Button from "./Button.vue";
import InputError from "./InputError.vue";
import InputLabel from "./InputLabel.vue";
import {ArrowUpTrayIcon} from "@heroicons/vue/24/outline";
import {uniqueId} from "lodash";
import {computed, onMounted, ref, useAttrs} from "vue";

const props = defineProps({
  id: {
    type: String,
    default() {
      return uniqueId("form-image-input-");
    },
  },
  modelValue: [File, String],
  previewUrl: {
    type: String,
    default: null,
  },
  label: String,
  error: [String, Array],
  required: {type: Boolean, default: false},
  imageClass: {type: String, default: "mb-2 rounded-lg"},
});

const emit = defineEmits(["update:modelValue"]);

const attrs = useAttrs();

const imageUpload = ref(null);
const imagePreview = ref(null);

const readOnly = computed(() => {
  return !!attrs["readonly"];
});

onMounted(() => {
  if (props.previewUrl) {
    imagePreview.value = props.previewUrl;
  }
});

function onUpload() {
  const image = imageUpload.value.files[0];

  if (!image) return;

  const reader = new FileReader();
  reader.onload = e => {
    imagePreview.value = e.target.result;
    emit("update:modelValue", image);
  };

  reader.readAsDataURL(image);
}
</script>

<template>
  <div>
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
    <img
      v-if="imagePreview"
      :src="imagePreview"
      :class="imageClass"
    />
    <input
      type="file"
      class="hidden"
      @change="onUpload"
      ref="imageUpload"
      accept="image/*"
    />
    <div class="flex flex-col items-start gap-2">
      <Button
        v-if="!readOnly"
        type="button"
        @click="$refs.imageUpload.click()"
      >
        <template #prefix>
          <ArrowUpTrayIcon class="w-4 h-4" />
        </template>
        Select Image
      </Button>
    </div>
    <div
      v-show="error"
      class="mt-2"
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
