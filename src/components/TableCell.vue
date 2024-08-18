<script setup>
import {useTableCellClasses} from "../Composables/useTableCellClasses";

const {tableCellClasses} = useTableCellClasses();
</script>

<template>
  <td :class="tableCellClasses">
    <slot />
  </td>
</template>
