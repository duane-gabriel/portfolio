<template>
  <div class="project-list w-100">
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
          <td @click="alter(p)">
            <i class="fas fa-pencil-alt icon rounded" style="background: green;"></i>
            <i class="far fa-trash-alt icon rounded" style="background: tomato;"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '@/services/api';
import VueGridLayout from 'vue-grid-layout';
import Vuetable from 'vuetable-2';

/*eslint-disable */
export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    Vuetable,
  },
  data() {
    return {
      projects: [],
      css: {
        table: {
          tableClass: 'table table-striped table-bordered table-hovered',
          loadingClass: 'loading',
          ascendingIcon: 'glyphicon glyphicon-chevron-up',
          descendingIcon: 'glyphicon glyphicon-chevron-down',
          handleIcon: 'glyphicon glyphicon-menu-hamburger',
        },
        pagination: {
          infoClass: 'pull-left',
          wrapperClass: 'vuetable-pagination pull-right',
          activeClass: 'btn-primary',
          disabledClass: 'disabled',
          pageClass: 'btn btn-border',
          linkClass: 'btn btn-border',
          icons: {
            first: '',
            prev: '',
            next: '',
            last: '',
          },
        },
      },
      pagination: {
        wrapperClass: 'pagination float-right',
        activeClass: 'active',
        disabledClass: 'disabled',
        pageClass: 'page-item',
        linkClass: 'page-link',
        paginationClass: 'pagination',
        paginationInfoClass: 'float-left',
        dropdownClass: 'form-control',
        icons: {
          first: 'fa fa-chevron-left',
          prev: 'fa fa-chevron-left',
          next: 'fa fa-chevron-right',
          last: 'fa fa-chevron-right',
        },
      },
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
    dataManager(sortOrder, pagination) {
      if (this.data.length < 1) return;

      let local = this.data;

      // sortOrder can be empty, so we have to check for that as well
      if (sortOrder.length > 0) {
        console.log('orderBy:', sortOrder[0].sortField, sortOrder[0].direction);
        local = _.orderBy(local, sortOrder[0].sortField, sortOrder[0].direction);
      }

      pagination = this.$refs.vuetable.makePagination(local.length, this.perPage);
      console.log('pagination:', pagination);
      let from = pagination.from - 1;
      let to = from + this.perPage;

      return {
        pagination: pagination,
        data: _.slice(local, from, to),
      };
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
