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
          <div
            class="pr-2 col-sm-12 col-md-4 col-lg-4 col-xl-4"
            v-for="(project, index) of cards"
            :key="project.id"
          >
            <figure
              @mouseover="imgHover('id' + index, 'over')"
              @mouseout="imgHover('id' + index, 'out')"
              @click="openModal(project)"
            >
              <img :src="project.thumbnail" alt class="img-fluid" />
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
import modalProject from '@/components/modal-project.vue';
import api from '@/services/api';

export default {
  components: { modalProject },
  data() {
    return {
      data: {},
      cards: [],
      visible: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    imgHover(id, option) {
      const overlays = document.getElementsByClassName('img-overlay');
      overlays.forEach((overlay) => overlay.classList.remove('visible'));
    },
    openModal(data) {
      this.visible = true;
      this.data = data;
    },
    getData() {
      api.get('projects').then(({ data }) => {
        let cards = this.cards;
        data.forEach((p, i) => {
          let id = p.id;
          let title = p.name;
          console.log(p.Files);

          let tecnologies = p.Technologies.sort((a, b) => {
            if (a.id > b.id) {
              return 1;
            } else {
              return -1;
            }
          });

          let description = p.description;
          let date = p.date;
          let preview = p.link;
          let content = '';
          let thumbnail = '';
          p.Files.forEach((f) => {
            if (f.star) {
              thumbnail = f.url;
            }
            content += `<img src="${f.url}"/>`;
          });

          let obj = {
            id,
            title,
            tecnologies,
            description,
            date,
            preview,
            content,
            thumbnail,
          };

          cards.push(obj);
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
header {
  background-color: $main_color !important;
  width: 100%;
  height: 120px;
  border-top-left-radius: $border_radius;
  border-top-right-radius: $border_radius;
  margin: 0 15px;
}
h1 {
  font-family: 'Montserrat', sans-serif;
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
img {
  border-radius: 05px;
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
