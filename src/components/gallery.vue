<template>
  <div
    id="carouselExampleControls"
    v-if="visible && images.length > 0"
    class="carousel slide gallery"
    data-ride="carousel"
  >
    <div class="carousel-inner">
      <div
        v-for="(image, index) of images"
        :class="['carousel-item', index === activeIndex ? 'active' : '']"
        :key="image.src"
      >
        <img class="d-block w-100" :src="image.src" alt="First slide" />
      </div>
    </div>
    <a
      class="carousel-control-prev"
      href="#carouselExampleControls"
      role="button"
      data-slide="prev"
      v-if="images.length > 1"
      @click="nav(-1)"
    >
      <i class="fas fa-angle-left icon"></i>
      <span class="sr-only">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      href="#carouselExampleControls"
      role="button"
      data-slide="next"
      v-if="images.length > 1"
      @click="nav(+1)"
    >
      <i class="fas fa-angle-right icon"></i>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
export default {
  props: ['images', 'visible'],
  data() {
    return {
      activeIndex: 0,
    };
  },
  methods: {
    nav(fun) {
      if (fun === -1 && this.images[this.activeIndex - 1]) {
        this.activeIndex -= 1;
      }
      if (fun === +1 && this.images[this.activeIndex + 1]) {
        this.activeIndex += 1;
      }
    },
  },
};
</script>

<style lang="scss">
.gallery {
  position: absolute;
  z-index: 10;
  top: 200px;
  left: 25%;
  right: 25%;
  .icon {
    font-size: 50px;
    color: #000;
  }
}
</style>
