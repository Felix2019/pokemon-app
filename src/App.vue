<script setup lang="ts">
import { ref } from "vue";
import PokemonCard from "./features/pokemon/components/PokemonCard.vue";
import SearchField from "./shared/components/SearchField.vue";
import { debounce } from "lodash-es";

const username = ref("");

const updateUsername = debounce((value: string) => {
  username.value = value.trim();
}, 500);
</script>

<template>
  <div class="p-6 flex flex-col gap-y-4 items-center min-h-screen bg-gray-50">
    <h2 class="text-2xl font-bold text-gray-800">Pokémon Finder</h2>

    <SearchField @change-input="updateUsername" />

    <PokemonCard :name="username" v-if="username" />
  </div>
</template>
