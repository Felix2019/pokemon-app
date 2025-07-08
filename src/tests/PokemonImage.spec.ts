import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import PokemonImage from "../features/pokemon/components/PokemonImage.vue";

describe("PokemonImage", () => {
  const imageSrc = "https://example.com/pokemon.png";
  const altText = "Pikachu";

  it("renders the image with correct src and alt", () => {
    const wrapper = mount(PokemonImage, {
      props: {
        imageSrc,
        alt: altText,
      },
    });

    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBe(imageSrc);
    expect(img.attributes("alt")).toBe(altText);
  });

  it("shows fallback UI when image fails to load", async () => {
    const wrapper = mount(PokemonImage, {
      props: { imageSrc },
    });

    const img = wrapper.find("img");
    await img.trigger("error");

    expect(wrapper.find("img").exists()).toBe(false);
    expect(wrapper.find('[aria-label="Image failed to load"]').exists()).toBe(
      true
    );
  });
});
