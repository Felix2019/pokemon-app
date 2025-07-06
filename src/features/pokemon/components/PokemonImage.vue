<script setup lang="ts">
import { defineProps } from "vue";

interface Prop {
  imageSrc: string;
}

defineProps<Prop>();
</script>

<template>
  <div
    class="relative w-28 h-28 flex items-center justify-center rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-gradient-to-br from-white to-gray-100 transition-all duration-300 hover:shadow-xl hover:border-blue-400"
  >
    <img
      :src="imageSrc"
      alt="Pokemon"
      class="w-20 h-20 object-contain transition-transform duration-300 hover:scale-110"
    />

    <div
      class="absolute inset-0 bg-gradient-to-br from-transparent to-white opacity-10 pointer-events-none"
    />
  </div>
</template>
