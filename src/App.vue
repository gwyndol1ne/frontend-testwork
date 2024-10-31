<template>
  <img alt="Sputnik logo" src="./assets/logo.png" />
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
