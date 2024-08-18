<script setup>
import {FwbButton} from "flowbite-vue";
</script>

<template>
  <fwb-button>
    <template
      v-if="$slots.prefix"
      #prefix
    >
      <slot name="prefix" />
    </template>
    <slot />
    <template
      v-if="$slots.suffix"
      #suffix
    >
      <slot name="suffix" />
    </template>
  </fwb-button>
</template>
