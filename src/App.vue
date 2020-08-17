<template>
  <div id="app" class>
    <Header v-if="!(['Login', 'Admin','Admin.projects'].indexOf($route.name) > -1)" />
    <router-view />
  </div>
</template>
<script>
import header from '@/components/header.vue';

export default {
  components: { Header: header },
};
</script>
<style lang="scss"></style>
