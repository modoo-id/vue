<script setup>
import {ChevronDownIcon, XMarkIcon} from "@heroicons/vue/24/solid";
import Multiselect from "@vueform/multiselect";
import axios from "axios";
import {computed, onMounted, ref, watch} from "vue";

const props = defineProps({
  mode: {
    type: String,
    default: "single",
  },
  placeholder: {
    type: String,
    default: "Select",
  },
  fetchUrl: {
    type: String,
  },
  modelValue: {
    type: [String, Number, Array],
  },
  params: {
    type: [Array, Object],
    required: false,
    default: () => [],
  },
  invalid: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  displayPlaceholder: {
    type: Boolean,
    default: true,
  },
  valueProp: {
    type: String,
    default: "id",
  },
  label: {
    type: String,
    default: "text",
  },
  canClear: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const proxyModelValue = computed({
  get: () => props.modelValue,
  set: val => emit("update:modelValue", val),
});

const fetchedOptions = ref([]);
const isLoading = ref(false);
const selected = ref(null);

function getData() {
  isLoading.value = true;
  if (props.fetchUrl) {
    axios
      .get(props.fetchUrl + "/", {
        params: {
          ...props.params,
        },
      })
      .then(res => {
        fetchedOptions.value = res.data;
      })
      .finally(() => {
        isLoading.value = false;
      });
  } else {
    isLoading.value = false;
  }
}

onMounted(() => {
  getData();
  // if (props.modelValue) {
  //   axios
  //     .get(props.fetchUrl + "/" + props.modelValue)
  //     .then(res => {
  //       selected.value = res.data;
  //     })
  //     .finally(() => {
  //       isLoading.value = false;
  //     });
  // }
});

watch(proxyModelValue, val => {
  if (val && props.fetchUrl) {
    axios
      .get(props.fetchUrl + "/" + props.modelValue)
      .then(res => {
        selected.value = res.data;
      })
      .finally(() => {
        isLoading.value = false;
      });
  } else {
    isLoading.value = false;
  }
});
</script>
<template>
  <Multiselect
    v-model="proxyModelValue"
    :mode="mode"
    :options="fetchedOptions"
    :value-prop="valueProp"
    :label="label"
    :placeholder="placeholder"
    :searchable="true"
    :loading="isLoading"
    :can-clear="canClear"
    :disabled="disabled"
    :classes="{
      container:
        'relative mx-auto w-full flex items-center justify-end box-border cursor-pointer border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-base leading-snug outline-none',
      containerDisabled: 'cursor-not-allowed bg-gray-100 dark:bg-gray-500',
      containerOpen: 'rounded-b-none',
      containerOpenTop: 'rounded-t-none',
      containerActive: 'ring ring-green-500 ring-opacity-30',
      wrapper:
        'relative mx-auto w-full flex items-center justify-end box-border cursor-pointer outline-none',
      singleLabel:
        'flex items-center h-full max-w-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5 pr-16 box-border rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5',
      singleLabelText: 'overflow-ellipsis overflow-hidden block whitespace-nowrap max-w-full',
      multipleLabel:
        'flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5 rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5',
      search:
        'w-full absolute inset-0 outline-none focus:ring-0 appearance-none box-border border-0 text-base font-sans bg-white dark:bg-gray-700 rounded pl-3.5 rtl:pl-0 rtl:pr-3.5',
      tags: 'flex-grow flex-shrink flex flex-wrap items-center mt-1 pl-2 min-w-0 rtl:pl-0 rtl:pr-2',
      tag: 'bg-green-500 text-white text-sm font-semibold py-0.5 pl-2 rounded mr-1 mb-1 flex items-center whitespace-nowrap min-w-0 rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1',
      tagDisabled: 'pr-2 opacity-50 rtl:pl-2',
      tagWrapper: 'whitespace-nowrap overflow-hidden overflow-ellipsis',
      tagWrapperBreak: 'whitespace-normal break-all',
      tagRemove:
        'flex items-center justify-center p-1 mx-0.5 rounded-sm hover:bg-black hover:bg-opacity-10 group',
      tagRemoveIcon:
        'bg-multiselect-remove bg-center bg-no-repeat opacity-30 inline-block w-3 h-3 group-hover:opacity-60',
      tagsSearchWrapper: 'inline-block relative mx-1 mb-1 flex-grow flex-shrink h-full',
      tagsSearch:
        'absolute inset-0 border-0 outline-none focus:ring-0 appearance-none p-0 text-base font-sans box-border w-full dark:bg-gray-700',
      tagsSearchCopy: 'invisible whitespace-pre-wrap inline-block h-px',
      placeholder:
        'flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5 text-gray-400 rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5',
      caret:
        'bg-multiselect-caret bg-center bg-no-repeat w-2.5 h-4 py-px box-content mr-3.5 relative z-10 opacity-40 flex-shrink-0 flex-grow-0 transition-transform transform pointer-events-none rtl:mr-0 rtl:ml-3.5',
      caretOpen: 'rotate-180 pointer-events-auto',
      clear:
        'pr-3.5 relative z-10 opacity-40 transition duration-300 flex-shrink-0 flex-grow-0 flex hover:opacity-80 rtl:pr-0 rtl:pl-3.5',
      clearIcon:
        'bg-multiselect-remove bg-center bg-no-repeat w-2.5 h-4 py-px box-content inline-block',
      spinner:
        'bg-multiselect-spinner bg-center bg-no-repeat w-4 h-4 z-10 mr-3.5 animate-spin flex-shrink-0 flex-grow-0 rtl:mr-0 rtl:ml-3.5',
      infinite: 'flex items-center justify-center w-full',
      infiniteSpinner:
        'bg-multiselect-spinner bg-center bg-no-repeat w-4 h-4 z-10 animate-spin flex-shrink-0 flex-grow-0 m-3.5',
      dropdown:
        'max-h-60 absolute -left-px -right-px bottom-0 transform translate-y-full border border-gray-300 dark:border-gray-600 -mt-px overflow-y-scroll z-50 bg-white dark:bg-gray-700 flex flex-col rounded-b',
      dropdownTop: '-translate-y-full top-px bottom-auto rounded-b-none rounded-t',
      dropdownHidden: 'hidden',
      options: 'flex flex-col p-0 m-0 list-none',
      optionsTop: '',
      group: 'p-0 m-0',
      groupLabel:
        'flex text-sm box-border items-center justify-start text-left py-1 px-3 font-semibold bg-gray-200 cursor-default leading-normal',
      groupLabelPointable: 'cursor-pointer',
      groupLabelPointed: 'bg-gray-300 text-gray-700',
      groupLabelSelected: 'bg-green-600 text-white',
      groupLabelDisabled: 'bg-gray-100 text-gray-300 cursor-not-allowed',
      groupLabelSelectedPointed: 'bg-green-600 text-white opacity-90',
      groupLabelSelectedDisabled: 'text-green-100 bg-green-600 bg-opacity-50 cursor-not-allowed',
      groupOptions: 'p-0 m-0',
      option:
        'flex items-center justify-start box-border text-left cursor-pointer text-base leading-snug py-2 px-3',
      optionPointed: 'text-gray-800 bg-gray-100 dark:bg-gray-600 dark:text-white',
      optionSelected: 'text-white bg-green-500',
      optionDisabled: 'text-gray-300 cursor-not-allowed',
      optionSelectedPointed: 'text-white bg-green-500 opacity-90',
      optionSelectedDisabled: 'text-green-100 bg-green-500 bg-opacity-50 cursor-not-allowed',
      noOptions:
        'py-2 px-3 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700 text-left rtl:text-right',
      noResults:
        'py-2 px-3 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700 text-left rtl:text-right',
      fakeInput:
        'bg-transparent absolute left-0 right-0 -bottom-px w-full h-px border-0 p-0 appearance-none outline-none text-transparent',
      assist: 'absolute -m-px w-px h-px overflow-hidden',
      spacer: 'h-9 py-px box-content',
    }"
  >
    <template v-slot:option="{option}">
      {{ option[label] }}
    </template>
    <template v-slot:caret="{handleCaretClick, isOpen}">
      <ChevronDownIcon
        class="w-4 h-4 dark:text-gray-400 z-10 mr-2 pointer-events-none"
        :class="{'rotate-180': isOpen}"
      />
    </template>
    <template v-slot:clear="{clear}">
      <XMarkIcon
        class="w-4 h-4 dark:text-gray-400 z-10 mr-2"
        @mousedown="clear"
      />
    </template>
    <template v-slot:tag="{option, handleTagRemove, disabled}">
      <span
        class="bg-green-500 text-white text-sm font-semibold py-0.5 pl-2 rounded mr-1 mb-1 flex items-center whitespace-nowrap min-w-0 rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1"
        tabindex="-1"
      >
        <span class="whitespace-nowrap overflow-hidden overflow-ellipsis me-2">{{
          option[label]
        }}</span>
        <span
          v-if="!disabled"
          class="flex items-center justify-center p-1 mx-0.5 rounded-sm hover:bg-black hover:bg-opacity-10 group"
          @click="handleTagRemove(option, $event)"
        >
          <XMarkIcon class="w-4 h-4 dark:text-white z-10 ms-1" />
        </span>
      </span>
    </template>
  </Multiselect>
</template>
