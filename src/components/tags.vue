<template>
  <div class="tags mx-3 my-4">
    <form>
      <div class="form-group">
        <label for="tag_name">Nome</label>
        <input type="text" v-model="name" class="form-control" id="tag_name" />
      </div>
      <div class="form-group d-flex justify-content-end">
        <button type="button" @click.prevent="saveTag" class="btn btn-success">{{buttonText}}</button>
      </div>
    </form>
    <table class="table table-striped w-100">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Nome</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t of tags" :key="t.id">
          <th scope="row">{{ t.id }}</th>
          <td>{{ t.name }}</td>
          <td>
            <i
              @click="editMode(t)"
              class="fas fa-pencil-alt icon rounded"
              style="background: green;"
            ></i>
            <i
              @click="deleteTag(t)"
              class="far fa-trash-alt icon rounded"
              style="background: tomato;"
            ></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/*eslint-disable */
import axios from 'axios';
import api from '@/services/api';
export default {
  data() {
    return {
      name: '',
      tags: [],
      buttonText: 'Add tag',
    };
  },
  mounted() {
    api.get('technologies').then(({ data }) => (this.tags = data));
  },
  methods: {
    saveTag() {
      const { name } = this;
      api
        .post(
          'technologies',
          { name },
          {
            headers: {
              'Content-type': 'application/json',
            },
          }
        )
        .then(({ data }) => {
          this.tags = [...this.tags, data];
          this.name = '';
        });
    },
    editMode(tag) {
      this.name = tag.name;
      this.buttonText = 'Edit tag';
    },
    deleteTag(tag) {
      api
        .delete(`technologies/${tag.id}`, {
          headers: {
            'Content-type': 'application/json',
          },
        })
        .then(
          ({ data }) => (this.tags = this.tags.filter((t) => t.id !== tag.id))
        );
    },
  },
};
</script>

<style lang="scss">
.tags {
  .icon {
    padding: 5px;
    margin: 5px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
