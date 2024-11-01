<template>
  <img alt="Sputnik logo" src="./assets/logo.png" class="sputnik-logo" />
  <ExcursionSearch />
</template>

<script>
import ExcursionSearch from "./components/ExcursionSearch.vue";
export default {
  name: "App",
  components: {
    ExcursionSearch,
  },
};
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
