<template>
  <div id="app">
    <router-view/>
    <notifications position="bottom right" width="600" duration=5 max=5 />
  </div>
</template>

<script>

export default {
  name: 'App'
}

</script>

<style>
nav {
  display: flex;
  gap: 10px;
}
</style>