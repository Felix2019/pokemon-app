<script lang="ts" setup>
import { ref, defineEmits, defineProps, watch } from "vue";

interface Prop {
  placeholder?: string;
}

const props = defineProps<Prop>();
const emit = defineEmits(["change-input"]);
const input = ref<string>("");

watch(input, (value) => {
  emit("change-input", value);
});
</script>

<template>
  <div class="w-full">
    <input v-model="input" type="text" :placeholder="props.placeholder || 'Search...'"
      class="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
  </div>
</template>