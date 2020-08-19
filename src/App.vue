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
};
</script>
<style lang="scss"></style>
