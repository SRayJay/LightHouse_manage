<script setup lang="ts">import { onMounted } from 'vue';
import storage from "./utils/storage.js";

onMounted(()=>{
  

})
</script>

<template>
  <router-view ></router-view>
</template>

<style lang="scss">
@import './assets/style/index.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
