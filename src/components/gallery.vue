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
        :class="['carousel-item', index === Index ? 'active' : '']"
        :key="image.src || image.url"
      >
        <img
          v-if="image.name.indexOf('mp4')===-1"
          class="d-block w-100"
          :src="image.src || image.url"
          alt="First slide"
        />
        <video v-else controls style="max-width: 100%;" class="mb-2">
          <source :src="image.src || image.url" type="video/mp4" />Your browser does not support the video tag.
        </video>
      </div>
    </div>
    <a
      class="carousel-control-prev"
      href="#carouselExampleControls"
      role="button"
      data-slide="prev"
      v-if="images.length > 1 && images[this.Index - 1]"
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
      v-if="images.length > 1 && images[this.Index + 1]"
      @click="nav(+1)"
    >
      <i class="fas fa-angle-right icon"></i>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
export default {
  props: ['images', 'visible', 'activeIndex'],
  data() {
    return {
      Index: this.activeIndex,
    };
  },
  methods: {
    nav(fun) {
      if (fun === -1 && this.images[this.Index - 1]) {
        this.Index -= 1;
      }
      if (fun === +1 && this.images[this.Index + 1]) {
        this.Index += 1;
      }
    },
  },
};
</script>

<style lang="scss">
.gallery {
  position: absolute;
  z-index: 10;
  top: 100px;
  bottom: 100px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  max-width: 1200px;
  max-height: 1200px;
  width: auto;
  height: auto;

  .carousel-item img {
    max-height: 80vh;
    max-width: 100%;
    height: auto;
    width: auto !important;
    margin: 0 auto;
  }

  .icon {
    font-size: 50px;
    color: #000;
  }
}
</style>
