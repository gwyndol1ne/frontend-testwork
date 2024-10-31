<template>
  <div class="search-container">
    <input
      type="text"
      v-model="title"
      placeholder="Введите название экскурсии"
    />

    <select v-model="selectedCity">
      <option value="">Выбрать город</option>
      <option v-for="city in cities" :key="city.id" :value="city.id">
        {{ city.name }}
      </option>
    </select>

    <button @click="searchExcursions">Поиск</button>
    <button @click="resetFilters">Сбросить фильтры</button>

    <div v-if="filteredExcursions.length === 0">
      <p>Поиск не дал результатов</p>
    </div>

    <div v-else>
      <div
        v-for="excursion in filteredExcursions"
        :key="excursion.id"
        class="excursion-card"
      >
        <img :src="excursion.image_big" alt="Катинка экскурсии" />
        <h3>{{ excursion.title }}</h3>
        <p>Рейтинг: {{ excursion.rating }}</p>
        <p>Цена: {{ excursion.price }} руб</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { getExcursions, getCities } from "@/services/apiService.ts";

export default defineComponent({
  name: "ExcursionSearch",
  setup() {
    const title = ref("");
    const selectedCity = ref("");
    const excursions = ref([]);
    const cities = ref([]);

    const loadExcursions = async () => {
      try {
        excursions.value = await getExcursions();
      } catch (error) {
        console.error("Ошибка при загрузке экскурсий:", error);
      }
    };

    const loadCities = async () => {
      try {
        cities.value = await getCities();
      } catch (error) {
        console.error("Ошибка при загрузке городов:", error);
      }
    };

    const filteredExcursions = computed(() => {
      return excursions.value.filter((excursion) => {
        const matchesTitle = excursion.title
          .toLowerCase()
          .includes(title.value.toLowerCase());
        const matchesCity = selectedCity.value
          ? excursion.city_id === selectedCity.value
          : true;
        return matchesTitle && matchesCity;
      });
    });

    const searchExcursions = () => {};

    const resetFilters = () => {
      title.value = "";
      selectedCity.value = "";
    };

    onMounted(() => {
      loadExcursions();
      loadCities();
    });

    return {
      title,
      selectedCity,
      excursions,
      cities,
      filteredExcursions,
      searchExcursions,
      resetFilters,
    };
  },
});
</script>

<style scoped>
.search-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: auto;
}

.excursion-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}
</style>
