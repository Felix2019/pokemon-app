<script setup lang="ts">
import { ref, defineProps, watch } from "vue";
import { usePokemonApi } from "../composables/usePokemonApi";
import { usePokemonIdFromName } from "../composables/usePokemonIdFromName";
import type { Pokemon } from "../interfaces/Pokemon";
import Loader from "../../../shared/components/Loader.vue";
import PokemonImage from "./PokemonImage.vue";

interface Prop {
  name: string;
}
const props = defineProps<Prop>();

const { getPokemon } = usePokemonApi();

const pokemon = ref<Pokemon | null>(null);
const loading = ref<boolean>(true);
const error = ref<Error | null>(null);

watch(
  () => props.name,
  async (newName) => {
    if (props.name.length === 0) pokemon.value = null;
    if (!newName) return;

    loading.value = true;
    error.value = null;

    try {
      const pokemonId = usePokemonIdFromName(newName);
      pokemon.value = await getPokemon(pokemonId);
    } catch (err) {
      error.value = err as Error;
      pokemon.value = null;
    } finally {
      loading.value = false;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <Loader v-if="loading && name.length > 0" />

    <div v-else>
      <div v-if="pokemon"
        class="w-full max-w-sm rounded-xl border border-gray-200 bg-white shadow-md p-5 flex flex-col items-center gap-4">
        <!-- sprites -->
        <div class="flex justify-center gap-4">
          <PokemonImage :imageSrc="pokemon.sprites.front_default">
          </PokemonImage>

          <PokemonImage :imageSrc="pokemon.sprites.back_default">
          </PokemonImage>
        </div>

        <!-- Name -->
        <h2 class="text-xl font-semibold text-gray-800 capitalize">
          {{ pokemon.name }}
        </h2>

        <!-- Attributes & Abilities -->
        <div class="flex flex-wrap justify-center gap-2">
          <span class="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full">
            Height: {{ pokemon.height }}
          </span>
          <span class="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full">
            Weight: {{ pokemon.weight }}
          </span>

          <span v-for="(ability, index) in pokemon.abilities" :key="index"
            class="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
            {{ ability }}
          </span>
        </div>
      </div>

      <span v-else-if="error" class="text-red-500"> {{ error.message }}</span>
    </div>
  </div>
</template>
