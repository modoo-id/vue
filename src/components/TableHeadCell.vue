<script setup>
import {useTableHeadCellClasses} from "../Composables/useTableHeadCellClasses";
import {ArrowDownIcon, ArrowUpIcon, ArrowsUpDownIcon} from "@heroicons/vue/24/outline";

const props = defineProps({
  sortable: {
    type: Boolean,
    default: false,
  },
  sortKey: {
    type: String,
    default: null,
  },
  sortBy: {
    type: String,
    default: null,
  },
  sortDirection: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["sort"]);

const {tableHeadCellClasses} = useTableHeadCellClasses();

const sort = () => {
  emit(
    "sort",
    props.sortKey,
    props.sortKey == props.sortBy ? (props.sortDirection == "asc" ? "desc" : "asc") : "asc"
  );
};
</script>

<template>
  <th
    scope="col"
    :class="tableHeadCellClasses"
  >
    <template v-if="sortable">
      <button
        class="flex items-center uppercase"
        :class="{
          'dark:text-white': sortKey == sortBy,
        }"
        @click="sort"
      >
        <slot />
        <ArrowsUpDownIcon
          v-if="sortKey != sortBy"
          class="w-3 h-3 ms-1.5"
        />
        <ArrowUpIcon
          v-else-if="sortDirection == 'asc'"
          class="w-3 h-3 ms-1.5"
        />
        <ArrowDownIcon
          v-else-if="sortDirection == 'desc'"
          class="w-3 h-3 ms-1.5"
        />
      </button>
    </template>
    <template v-else>
      <slot />
    </template>
  </th>
</template>
