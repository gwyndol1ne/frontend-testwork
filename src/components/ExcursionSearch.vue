<template>
  <div class="search-container">
    <h1>Экскурсии по всему миру</h1>
    <div class="filters">
      <input
        class="excursion-name-search"
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
    </div>

    <div v-if="filteredExcursions.length === 0">
      <p>Поиск не дал результатов</p>
    </div>

    <div class="excursion-list" v-else>
      <div
        v-for="excursion in filteredExcursions"
        :key="excursion.id"
        class="excursion-card"
      >
        <img
          :src="excursion.image_big"
          class="excursion-image"
          alt="Катинка экскурсии"
        />
        <div class="rating-container">
          <img src="@/assets/star.png" alt="Звезда" class="star-image" />
          <p class="rating-text">
            {{ excursion.customers_review_rating }} ({{ excursion.reviews }})
          </p>
        </div>
        <h3>{{ excursion.title }}</h3>
        <h3>От {{ excursion.price }}</h3>
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
    };
  },
});
</script>

<style scoped>
.search-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 20px;
  margin-bottom: 40px;
}
.filters {
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
  margin: auto;
  gap: 1rem;
}
.excursion-name-search {
  width: 400px;
  height: 30px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}
.excursion-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  margin-top: 20px;
  margin-left: 30px;
}

.excursion-card {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  gap: 0.5rem;
  margin-bottom: 10px;
}

.excursion-image {
  border-radius: 10px;
  width: 100%;
  height: 300px;
  object-fit: cover;
}

h3,
p {
  margin: 0;
}
.rating-container {
  display: flex;
  align-items: center;
  font-size: 15px;
  margin-bottom: 4px;
}

.star-image {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}
</style>
