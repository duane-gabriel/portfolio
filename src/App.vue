<template>
  <div id="app" class>
    <Header v-if="!(exclude.indexOf($route.name) > -1)" />
    <router-view />
  </div>
</template>
<script>
import header from '@/components/header.vue';

export default {
  components: { Header: header },
  data() {
    return {
      exclude: ['Login', 'Admin', 'Admin.projects', 'Admin.tags'],
    };
  },
  mounted() {
    window.onbeforeunload = function () {
      const storage = JSON.parse(localStorage.getItem('vuex'));
      storage.menuIsActive = 'home';
      localStorage.setItem('vuex', JSON.stringify(storage));
    };
  },
};
</script>
<style lang="scss">
div.container {
  border-radius: $border_radius !important;
  background-color: white !important;
  min-height: 600px !important;
  padding: 0 !important;
  box-shadow: 0 15px 20px 0 rgba(0, 0, 0, 0.1) !important;
  margin-bottom: 30px !important;
}
</style>
