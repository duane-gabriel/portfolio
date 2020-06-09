<template>
  <div id="app" class="">
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
