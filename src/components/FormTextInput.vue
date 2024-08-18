<script setup>
import InputError from "./InputError.vue";
import InputLabel from "./InputLabel.vue";
import TextInput from "./TextInput.vue";
import {uniqueId} from "lodash";
import {computed, ref, useAttrs} from "vue";

defineProps({
  id: {
    type: String,
    default() {
      return uniqueId("form-text-input-");
    },
  },
  type: {
    type: String,
    default: "text",
  },
  modelValue: [Number, String],
  label: String,
  error: [String, Array],
  step: String,
  placeholder: {type: String, default: null},
  required: {type: Boolean, default: false},
  autofocus: {type: Boolean, default: false},
});

const emit = defineEmits(["update:modelValue"]);

const input = ref(null);

const attrs = useAttrs();

const readOnly = computed(() => {
  return !!attrs["readonly"];
});

defineExpose({
  focus: () => input.value.focus(),
  select: () => input.value.select(),
});
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
    <TextInput
      :id="id"
      :type="type"
      :invalid="!!error"
      :readonly="readOnly"
      :value="modelValue"
      :placeholder="placeholder"
      @input="emit('update:modelValue', $event.target.value)"
      ref="input"
      :step="step"
      :autofocus="autofocus"
    />
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
