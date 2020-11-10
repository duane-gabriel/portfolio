<template>
  <div class="project-modal" v-if="visible">
    <div class="container px-5">
      <div class="d-flex justify-content-end mt-4">
        <span
          v-if="arrows.prev!=null"
          class="mr-3 cursor-pointer arrows-container"
          @click="nav(arrows.prev)"
        >
          <i class="fas fa-arrow-left" style="color:#424242;"></i>
        </span>
        <span
          v-if="arrows.next!=null"
          class="mr-4 cursor-pointer arrows-container"
          @click="nav(arrows.next)"
        >
          <i class="fas fa-arrow-right" style="color:#424242;"></i>
        </span>
        <span class="mr-4 arrows-container cursor-pointer" @click="closeModal">
          <i class="fas fa-times" style="color:#424242;font-size:21px;"></i>
        </span>
      </div>

      <div class="row d-flex justify-content-center mt-5 mt-sm-5 mt-md-5 mt-lg-2" style="padding: 0 10px;margin:0;">
        <h1 class="h2 ml-4 font-weight-normal" style="line-height: 48px;">{{data.title}}</h1>
      </div>
      <div class="row mt-5 px-4 px-sm-0 px-md-0 px-lg-0">
        <div
          class="modal-project-content col-md-8 col-lg-8 mt-1 mt-sm-5 mt-md-5 mt-lg-5 d-flex flex-column align-items-center"
          v-html="data.content"
        ></div>
        <div class="col-md-4 col-lg-4 mt-5">
          <div class="descricao">
            <h2 class="h3 font-weight-light">Descrição</h2>
            <div class="mt-3">
              <i class="fas fa-globe-americas mr-2"></i>
              <a target="_blank" :href="data.preview" style="color:#424242">{{data.preview}}</a>
            </div>
            <div class="mt-3">
              <i class="fab fa-github mr-2"></i>
              <a target="_blank" :href="data.repository" style="color:#424242">{{data.repository}}</a>
            </div>
            <div class="mt-3">
              <i class="fas fa-calendar-minus mr-2"></i>
              <span style="color:#424242">{{data.date}}</span>
            </div>
            <p class="mt-3" style="color:#424242">{{data.description}}</p>
          </div>
          <div class="tecnologies mt-3">
            <h2 class="h3 font-weight-light">Tecnologias</h2>
            <ul class="list-group list-group-horizontal-xl pt-2 flex-row flex-wrap">
              <li
                class="list-group-item mr-2 border mb-2"
                v-for="tec of data.tecnologies"
                :key="tec.id"
              >{{tec.name}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data', 'visible', 'arrows'],
  data() {
    return {};
  },
  mounted() {
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    nav(index) {
      this.$emit('nav', index);
    },
  },
};
</script>

<style lang="scss">
.project-modal {
  .arrows-container {
    background: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    border-radius: 2px;
    i {
      font-size: 18px;
    }
    &:hover {
      i:hover {
        color: $primary !important;
      }
    }
    i:hover {
      color: $primary !important;
    }
  }
  .close i:hover,
  .descricao i {
    color: $primary !important;
  }
  z-index: 20;
  background-color: #fff;
  width: 100%;
  min-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  font-family: 'Montserrat', sans-serif;
  overflow-x: hidden;
  .container {
    margin-top: unset !important;
    border-radius: unset !important;
    background-color: unset !important;
    min-height: unset !important;
    padding: unset !important;
    box-shadow: unset !important;
  }
  .modal-project-content {
    img {
      max-width: 100%;
      margin-bottom:20px;
      border: 1px solid rgba(0,0,0,0.1);
      border-radius: 10px;
       &:last-child {
        margin-bottom: 0;
      }
    }
  }

}
</style>
