<template>
  <div class="Admin">
    <div class="container mt-5">
      <div class="row">
        <div class="col-4">
          <menu-admin />
        </div>
        <div class="col-8 col-md-8 col-lg-8 border bg-white rounded p-3">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menuAdmin from '@/components/menu-admin.vue';

export default {
  components: {
    menuAdmin,
  },
};
</script>

<style lang="scss">
.Admin {
  .container {
    border-radius: unset !important;
    background-color: unset !important;
    min-height: unset !important;
    box-shadow: unset !important;
  }
}
</style>
