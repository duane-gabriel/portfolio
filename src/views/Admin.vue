<template>
  <div class="Admin">
    <div class="menu bg-white shadow-sm">
      <div class="container d-flex justify-content-between">
        <span class="h1 font-weight-normal">CMS</span>
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
              style="color:#000;"
            >Duane Faria</a>

            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a class="dropdown-item" href="#" @click="$store.dispatch('logout')">Sair</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-11 col-sm-12 col-md-4 col-lg-4 col-xl-4" style="margin:0 auto;">
          <menu-admin />
        </div>
        <div
          class="content col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 rounded w-100 d-flex justify-content-center"
        >
          <router-view class="col-11 bg-white" @visible="index = $event + '_' + Math.random()" />
        </div>
      </div>
    </div>
    <div class="container-gallery" v-if="visible && $store.state.files.length > 0">
      <gallery id="gallery" :images="$store.state.files" :visible="visible" :activeIndex="index" />
    </div>
  </div>
</template>

<script>
import menuAdmin from '@/components/menu-admin.vue';
import gallery from '@/components/gallery.vue';

export default {
  components: {
    menuAdmin,
    gallery,
  },
  data() {
    return {
      visible: false,
      index: 0,
    };
  },
  mounted() {
    const that = this;
    document.body.addEventListener('click', (e) => {
      const x = Array.from(e.target.classList);
      if (x.indexOf('container-gallery') !== -1) {
        that.visible = false;
      }
    });
  },
  methods: {
    setVisibility() {
      this.visible = true;
    },
  },
  watch: {
    index() {
      this.index = Number(this.index.split('_')[0]);
      this.visible = true;
    },
  },
};
</script>

<style lang="scss">
.Admin {
  .menu {
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  }
  .container {
    border-radius: unset !important;
    background-color: unset !important;
    min-height: unset !important;
    box-shadow: unset !important;
  }
  .container-gallery {
    background: rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 0;
    z-index: 9;
    width: 100%;
    height: 100vh;
  }
  .none {
    display: none !important;
  }
  @media (max-width: 500px) {
    .container {
      padding: 5px 20px !important;
    }
    .content {
      margin-top: 15px;
    }
  }
}
</style>
