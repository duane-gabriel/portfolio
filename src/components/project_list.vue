<template>
  <div class="project-list w-100">
    <!-- <datatable class="w-100" :columns="columns" :data="projects"></datatable> -->
    <table class="table table-striped w-100">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Nome</th>
          <th scope="col">Data</th>
          <th scope="col">Link</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p of projects" :key="p.id">
          <th scope="row">{{ p.id }}</th>
          <td>{{ p.name }}</td>
          <td>{{ p.date }}</td>
          <td>{{ p.link }}</td>
          <td @click="alter">
            <i class="fas fa-pencil-alt icon rounded" style="background: green;"> </i
            ><i class="far fa-trash-alt icon rounded" style="background: tomato;"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
/*eslint-disable */
export default {
  data() {
    return {
      columns: [
        { label: 'id', field: 'id' },
        { label: 'nome', field: 'name', headerClass: 'class-in-header second-class' },
        { label: 'data', field: 'date' },
        { label: 'link', field: 'link' },
      ],
      projects: [],
    };
  },
  mounted() {
    this.requestProjects();
  },
  methods: {
    requestProjects() {
      axios
        .get('http://localhost:3000/projects', null, {
          headers: {
            Authorization: `Bearer ${this.$store.state.user.token}`,
          },
        })
        .then(({ data }) => {
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
    alter() {
      this.$emit('change', false);
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
