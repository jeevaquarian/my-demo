<template>
  <div id="app">
 
   <div class="mb-4">
    <Header />
    </div>
    <div class="mt-4">
    <Weather />
    </div>
  </div>
</template>

<script>
import Weather from './components/Weather'
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Weather,
    Header
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
