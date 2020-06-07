<template>
  <div id="app">
    <Header/>
    <router-view />
  </div>
</template>
<script>
import header from '@/components/header.vue';

export default {
  components: { Header: header },
};
</script>
<style lang="scss">

</style>
