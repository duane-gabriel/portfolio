<template>
  <div class="project-modal" v-if="visible">
    <div class="container">
      <span class="close" @click="closeModal"><i class="far fa-times-circle"></i></span>
      <div class="row d-flex justify-content-center mt-5">
        <h1 class="h2">{{data.title}}</h1>
      </div>
      <div class="row mt-5">
        <div class="col-md-8 col-lg-8 mt-5">jdoiwajdoiwaj</div>
        <div class="col-md-4 col-lg-4 mt-5">
          <div class="descricao">
            <h2 class="h3">Descrição </h2>
            <i class="fas fa-globe-americas"></i> <a target="_blank"
            :href="data.preview">{{data.preview}}</a><br/>
            <i class="fas fa-calendar-minus mr-2 mt-2"></i>{{data.date}}
            <p class="mt-1">{{data.description}}</p>
          </div>
          <div class="tecnologies mt-3">
            <h2 class="h3">Tecnologias</h2>
            <ul class="list-group list-group-horizontal-xl pt-2">
              <li class="list-group-item mr-2 border"
              v-for="tec of data.tecnologies" :key="Math.random()+tec">{{tec}}</li>
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
    return {
    };
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
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

.container {
  margin-top: unset !important;
  border-radius: unset !important;
  background-color: unset !important;
  min-height: unset !important;
  padding: unset !important;
  box-shadow: unset !important;
}
span.close:hover{
  cursor:pointer;
}
}
</style>
