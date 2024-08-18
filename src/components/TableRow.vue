<script setup>
import {useTableRowClasses} from "../Composables/useTableRowClasses";

const {tableRowClasses} = useTableRowClasses();
</script>

<template>
  <tr :class="tableRowClasses">
    <slot />
  </tr>
</template>
