<template>
  <div class="portfolio d-flex justify-content-center">
    <div class="container">
      <div class="row">
        <header class="d-flex justify-content-center align-items-center">
          <h1 class="text-white">Projetos</h1>
        </header>
      </div>
      <spinner v-if="spinner" class="d-flex justify-content-center mt-5 pt-5" />
      <div class="row pt-5 d-flex justify-content-center mb-3" v-else>
        <div
          class="grid-container d-flex justify-content-center"
          style="width: 95%; flex-wrap: wrap;"
        >
          <div
            class="col-sm-12 col-md-4 col-lg-4 col-xl-4"
            v-for="(project, index) of cards"
            :key="project.id"
          >
            <figure
              @mouseover="imgHover('id' + index, 'over')"
              @mouseout="imgHover('id' + index, 'out')"
              @click="openModal(project, index)"
            >
              <img :src="project.thumbnail" alt class="img-fluid img-star" />
              <div :class="'position-absolute img-overlay ' + 'id' + index"></div>
            </figure>
          </div>
        </div>
      </div>
    </div>
    <modalProject
      @closeModal="visible = false"
      @nav="nav($event)"
      :data="data"
      :arrows="arrows"
      :cards="cards"
      :visible="visible"
    />
  </div>
</template>

<script>
/* eslint-disable */
import modalProject from '@/components/modal-project.vue';
import api from '@/services/api';
import spinner from '@/components/spinner.vue';

export default {
  components: { modalProject, spinner },
  data() {
    return {
      data: {},
      cards: [],
      visible: false,
      arrows: {},
      spinner: false,
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
    openModal(data, currentIndex) {
      this.visible = true;
      this.data = data;
      this.arrows = {
        prev: this.cards[currentIndex - 1] ? currentIndex - 1 : null,
        next: this.cards[currentIndex + 1] ? currentIndex + 1 : null,
      };
    },
    getData() {
      this.spinner = true;
      const that = this;
      api.get('projects').then(({ data }) => {
        let cards = this.cards;

        data.forEach((p, i) => {
          let id = p.id;
          let title = p.name;
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
            if (f.name.indexOf('mp4') === -1) {
              if (f.star) {
                thumbnail = f.url;
              }
              content += `<img src="${f.url}"/>`;
            } else {
              let oldContent = content;
              content = `<video controls style='max-width: 100%;' class="mb-2">
                <source src="${f.url}" type="video/mp4">
                Your browser does not support the video tag.
              </video>`;
              content += oldContent;
            }
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
        that.spinner = false;
      });
    },
    nav(index) {
      this.openModal(this.cards[index], index);
    },
  },
  head: {
    title: {
      inner: 'Projetos',
    },
  },
};
</script>

<style scoped lang="scss">
figure {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  border: 1px solid rgba(0, 0, 0, 0.075);
  border-radius: 05px;
}
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
.img-star {
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: 50% 50%;
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
