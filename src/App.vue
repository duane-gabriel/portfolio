<template>
  <div id="app" class="">
    <Header v-if="$route.path !== '/login'"/>
    <router-view />
  </div>
</template>
<script>
import header from '@/components/header.vue';

export default {
  components: { Header: header },
  created() {
    console.log(this.$route);
    console.log(this.$router);
  },
  watch: {
    $route() {
      console.log('... change');
    },
  },
};
</script>
<style lang="scss">

</style>
