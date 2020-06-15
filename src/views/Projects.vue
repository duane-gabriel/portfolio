<template>
  <div class="portfolio d-flex justify-content-center">
    <div class="container">
      <div class="row">
        <header class="d-flex justify-content-center align-items-center">
          <h1 class="text-white">Projetos</h1>
        </header>
      </div>
      <div class="row pt-5 d-flex justify-content-center">
        <div class="grid-container d-flex justify-content-center" style="width: 95%;">
          <div class="pr-2 col-sm-12 col-md-4 col-lg-4 col-xl-4" v-for="(x, index) of 3" :key="x">
            <figure
              @mouseover="imgHover('id' + index, 'over')"
              @mouseout="imgHover('id' + index, 'out')"
              @click="openModal(cards[0])"
            >
              <img
                src="https://image.freepik.com/fotos-gratis/homem-de-codificacao_1098-18084.jpg"
                alt
                class="img-fluid"
              />
              <div :class="'position-absolute img-overlay ' + 'id' + index"></div>
            </figure>
          </div>
        </div>
      </div>
    </div>
    <modalProject @closeModal="visible = false" :data="data" :visible="visible" />
  </div>
</template>

<script>
/* eslint-disable */
import modalProject from "@/components/modal-project.vue";
export default {
  components: { modalProject },
  data() {
    return {
      data: {},
      cards: [
        {
          title: "Github searcher com Reacjs",
          tecnologies: ["React", "React router", "Redux"],
          description: "Um projeto com o intuito...",
          date: "10/10/10",
          preview: "https://www.google.com.br"
        }
      ],
      visible: false
    };
  },
  methods: {
    imgHover(id, option) {
      const overlays = document.getElementsByClassName("img-overlay");
      // console.log(overlays);
      overlays.forEach(overlay => overlay.classList.remove("visible"));

      // const className = document.getElementsByClassName(id)[0];

      if (option === "over") {
        // className.classList.add('visible');
        // return;
      }
      // className.classList.remove('visible');
    },
    openModal(data) {
      this.visible = true;
      this.data = data;
    }
  }
};
</script>

<style scoped lang="scss">
header {
  background-color: $main_color !important;
  width: 100%;
  height: 120px;
  border-top-left-radius: $border_radius;
  border-top-right-radius: $border_radius;
}
h2 {
  font-size: 1.5rem;
}
.container {
  min-height: 900px !important;
  margin-bottom: 50px;
}
.img-overlay {
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  left: -100%;
  top: 0;
  visibility: hidden;
  transition: all 300ms ease 0s;
  &:hover {
    cursor: pointer;
  }
}
.visible {
  visibility: visible;
  left: 0;
}
figure:hover {
  cursor: pointer;
}
@media (max-width: 500px) {
  .grid-container {
    flex-direction: column;
    figure {
      margin-bottom: 20px;
    }
  }
}
</style>
