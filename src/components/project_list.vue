<template>
  <div class="project-list w-100">
    <div class="wrap-table100">
      <div class="table">
        <div class="row header bg-primary">
          <div class="cell">Id</div>
          <div class="cell">Nome</div>
          <div class="cell">Data</div>
          <div class="cell">Link</div>
          <div class="cell">Ações</div>
        </div>

        <div class="row" v-for="p of projects" :key="p.id">
          <div class="cell">{{ p.id }}</div>
          <div class="cell">{{ p.name }}</div>
          <div class="cell">{{ p.date }}</div>
          <div class="cell">{{ p.link }}</div>
          <div class="cell">
            <i
              class="fas fa-pencil-alt icon rounded text-white"
              @click="alter(p)"
              style="background: green;"
            ></i>
            <i class="far fa-trash-alt icon rounded text-white" style="background: tomato;"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';

/*eslint-disable */
export default {
  components: {},
  data() {
    return {
      projects: [],
    };
  },
  mounted() {
    this.requestProjects();
  },
  methods: {
    requestProjects() {
      api.get('projects').then(({ data }) => {
        data.sort((a, b) => {
          if (a.id > b.id) {
            return 1;
          }
          if (a.id < b.id) {
            return -1;
          }
        });
        this.projects = data;
      });
    },
    alter(project) {
      this.$emit('change', project);
    },
  },
};
</script>

<style lang="scss">
.project-list {
  .icon {
    padding: 5px;
    margin: 5px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
