<template>
  <div class="tags mx-3 my-4">
    <form>
      <div class="form-group">
        <label for="tag_name">Nome</label>
        <input type="text" v-model="tag.name" class="form-control" id="tag_name" />
      </div>
      <div class="form-group d-flex justify-content-end">
        <button type="button" @click.prevent="saveTag" class="btn btn-success">{{buttonText}}</button>
      </div>
    </form>
    <div class="wrap-table100">
      <div class="table">
        <div class="row header bg-primary">
          <div class="cell">Id</div>
          <div class="cell">Nome</div>
          <div class="cell">Ações</div>
        </div>

        <div class="row" v-for="t of tags" :key="t.id">
          <div class="cell">{{ t.id }}</div>
          <div class="cell" style="width:320px;">{{ t.name }}</div>
          <div class="cell">
            <i
              class="fas fa-pencil-alt icon rounded text-white"
              @click="editTag(t)"
              style="background: green;"
            ></i>
            <i
              @click="deleteTag(t)"
              class="far fa-trash-alt icon rounded text-white"
              style="background: tomato;"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import api from '@/services/api';
import dao from '@/services/dao';
export default {
  data() {
    return {
      tag: { name: '' },
      tags: [],
      buttonText: 'Add tag',
    };
  },
  mounted() {
    dao.url = 'technologies';
    dao.headers = {
      'Content-type': 'application/json',
    };
    dao.get().then(({ data }) => (this.tags = data));
  },
  methods: {
    saveTag() {
      const { name } = this.tag;
      if (this.buttonText == 'Edit tag') {
        const tag = this.tag;
        dao.put(tag).then(({ data: id }) => {
          const i = this.tags.findIndex((t) => t.id === id);
          this.tags[i].name = tag.name;
        });
        this.tag = {};
        this.buttonText = 'Add tag';
        return;
      }
      dao.post({ name }).then(({ data }) => {
        this.tags = [...this.tags, data];
        this.tag.name = '';
      });
    },
    editTag(tag) {
      this.tag = { ...tag };
      this.buttonText = 'Edit tag';
    },
    deleteTag(tag) {
      dao
        .delete(tag.id)
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
