<script setup lang="ts">
import { ref, defineProps } from "vue";

interface Prop {
  imageSrc: string;
  alt?: string;
}

defineProps<Prop>();

const imageLoaded = ref<boolean>(false);
const imageError = ref<boolean>(false);

const handleImageLoad = (): void => {
  imageLoaded.value = true;
  imageError.value = false;
};

const handleImageError = (): void => {
  imageError.value = true;
  imageLoaded.value = false;
};
</script>

<template>
  <div
    class="relative w-28 h-28 flex items-center justify-center rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-gradient-to-br from-white to-gray-100 transition-all duration-300 hover:shadow-xl hover:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
    role="img"
    :aria-label="alt"
  >
    <img
      v-if="!imageError"
      :src="imageSrc"
      :alt="alt"
      @load="handleImageLoad"
      @error="handleImageError"
      loading="lazy"
      class="w-20 h-20 object-contain transition-transform duration-300 hover:scale-110"
      :class="{ 'opacity-0': !imageLoaded }"
    />

    <!-- error fallback -->
    <div
      v-if="imageError"
      class="w-20 h-20 flex items-center justify-center bg-gray-100 text-gray-400"
      aria-label="Image failed to load"
    >
      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clip-rule="evenodd"
        />
      </svg>
    </div>

    <!--overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-transparent to-white opacity-10 pointer-events-none"
      aria-hidden="true"
    />
  </div>
</template>
