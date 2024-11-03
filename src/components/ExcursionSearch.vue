<template>
  <div class="search-container">
    <h1>Экскурсии по всему миру</h1>
    <div class="filters">
      <div class="input-container">
        <input
          class="excursion-name-search"
          type="text"
          v-model="title"
          placeholder="Введите название экскурсии"
          @input="showSuggestions = title.length > 0"
        />

        <ul
          v-if="showSuggestions && filteredSuggestions.length"
          class="suggestions-list"
        >
          <li
            v-for="(suggestion, index) in filteredSuggestions"
            :key="index"
            @click="selectSuggestion(suggestion)"
          >
            {{ suggestion }}
          </li>
        </ul>
      </div>

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
        <div class="image-container">
          <img
            :src="excursion.image_big"
            class="excursion-image"
            alt="Катинка экскурсии"
          />
          <div class="overlay">
            <p class="short-info">{{ excursion.short_info }}</p>
          </div>
        </div>
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
    const showSuggestions = ref(false);

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

    const excursionTitles = computed(() =>
      excursions.value.map((excursion) => excursion.title)
    );

    const filteredSuggestions = computed(() =>
      excursionTitles.value.filter((t) =>
        t.toLowerCase().includes(title.value.toLowerCase())
      )
    );

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

    const selectSuggestion = (suggestion) => {
      title.value = suggestion;
      showSuggestions.value = false;
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
      filteredSuggestions,
      showSuggestions,
      selectSuggestion,
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
.input-container {
  position: relative;
}
.excursion-name-search {
  font-size: 16px;
  padding-left: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 500px;
  height: 40px;
  outline: none;
}
.excursion-name-search:focus {
  border-color: #007bff;
}
select {
  width: 250px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #ffffff;
  color: #333;
  font-size: 16px;
  appearance: none;
  outline: none;
  cursor: pointer;
  transition: border-color 0.3s, box-shadow 0.3s;
}
select:focus {
  border-color: #007bff;
}
.suggestions-list {
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
  margin-top: 5px;
  background-color: #ffffff;
  list-style-type: none;
  padding: 0;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1000;
}
.suggestions-list li {
  padding: 8px 12px;
  cursor: pointer;
}
.suggestions-list li:hover {
  background-color: #f0f0f0;
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
.image-container {
  position: relative;
  width: 100%;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.image-container:hover .overlay {
  opacity: 1;
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
.short-info {
  font-size: 16px;
  color: #333;
  text-align: left;
  padding: 10px;
}
</style>
