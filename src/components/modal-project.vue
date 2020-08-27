<template>
  <div class="project-modal" v-if="visible">
    <div class="container px-5">
      <span class="close mr-4" @click="closeModal">
        <i class="far fa-times-circle"></i>
      </span>
      <div class="row d-flex justify-content-center mt-5 mt-sm-5 mt-md-5 mt-lg-5">
        <h1 class="h2 ml-4 font-weight-normal">{{data.title}}</h1>
      </div>
      <div class="row mt-5 px-4 px-sm-0 px-md-0 px-lg-0">
        <div
          class="modal-project-content col-md-8 col-lg-8 mt-1 mt-sm-5 mt-md-5 mt-lg-5"
          v-html="data.content"
        ></div>
        <div class="col-md-4 col-lg-4 mt-5">
          <div class="descricao">
            <h2 class="h3 font-weight-light">Descrição</h2>
            <i class="fas fa-globe-americas mr-2"></i>
            <a target="_blank" :href="data.preview">{{data.preview}}</a>
            <br />
            <i class="fas fa-calendar-minus mr-2 mt-2"></i>
            {{data.date}}
            <p class="mt-1">{{data.description}}</p>
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
  props: ['data', 'visible'],
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
  },
};
</script>

<style lang="scss">
.project-modal {
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

  span.close:hover {
    cursor: pointer;
  }

  .modal-project-content {
    img {
      max-width: 100%;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
