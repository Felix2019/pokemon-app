<script setup lang="ts">
import { ref, onMounted } from "vue";
import PokemonCard from "./features/pokemon/components/PokemonCard.vue";
import SearchField from "./shared/components/SearchField.vue";
import { debounce } from "lodash-es";

const username = ref("");
const searchFieldRef = ref<HTMLElement>();

const updateUsername = debounce((value: string) => {
  username.value = value.trim();
}, 300);

onMounted(() => {
  if (searchFieldRef.value) {
    searchFieldRef.value.focus();
  }
});
</script>

<template>
  <main class="p-6 flex flex-col gap-y-4 items-center min-h-screen bg-gray-50">
    <header>
      <h1 class="text-2xl font-bold text-gray-800" id="app-title">
        Pokémon Finder
      </h1>
    </header>

    <section aria-labelledby="app-title" class="w-full max-w-md">
      <SearchField
        ref="searchFieldRef"
        @change-input="updateUsername"
        placeholder="Enter your username"
        aria-describedby="search-instructions"
      />
      <p id="search-instructions" class="sr-only">
        Type a username to get an image of a Pokemon. Results will appear below.
      </p>
    </section>

    <section aria-live="polite" aria-atomic="true">
      <PokemonCard :name="username" v-if="username" />
    </section>
  </main>
</template>
