<template>
  <div class="Admin">
    <div class="menu bg-white shadow-sm">
      <div class="container pt-3 d-flex justify-content-between">
        <span class="h1 font-weight-normal">
          CMS
        </span>
        <div class="d-flex flex-column">
          <div class="dropdown mt-1">
            <a
              class="btn dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Duane Faria
            </a>

            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a class="dropdown-item" href="#">Sair</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
          <menu-admin />
        </div>
        <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 border bg-white rounded p-5 w-100">
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
  .menu {
  }
  .container {
    border-radius: unset !important;
    background-color: unset !important;
    min-height: unset !important;
    box-shadow: unset !important;
  }
}
</style>
