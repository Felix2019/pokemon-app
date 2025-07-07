<script lang="ts" setup>
import { ref, defineEmits, defineProps, watch } from "vue";

interface Prop {
  placeholder?: string;
}

const props = defineProps<Prop>();
const emit = defineEmits(["change-input"]);
const input = ref<string>("");
const inputRef = ref<HTMLInputElement>();

const focus = (): void => {
  inputRef.value?.focus();
};

defineExpose({ focus });

watch(input, (value) => {
  emit("change-input", value);
});

const handleKeyDown = (event: KeyboardEvent): void => {
  if (event.key === "Escape") {
    input.value = "";
    inputRef.value?.blur();
  }
};
</script>

<template>
  <div class="w-full">
    <label for="pokemon-search" class="sr-only">
      Search for Pokémon Image
    </label>
    <input
      id="pokemon-search"
      ref="inputRef"
      v-model="input"
      type="text"
      :placeholder="props.placeholder || 'Search...'"
      @keydown="handleKeyDown"
      class="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
      autocomplete="off"
      spellcheck="false"
      aria-describedby="search-instructions"
    />
  </div>
</template>
