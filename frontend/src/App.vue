<template>
  <div id="app">
    <navbar/>
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar: Navbar
  }
}
</script>

<style>
html{
  background-color: rgb(228, 228, 228);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-top: 20px;
  background-color: rgb(228, 228, 228);
}
</style>