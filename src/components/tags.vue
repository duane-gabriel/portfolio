<template>
  <div class="tags mx-3 shadow" style>
    <div class="header d-flex justify-content-between align-items-center mb-3">
      <span class="ml-4">Tags</span>
    </div>
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
    <nav aria-label="Page navigation example" style="display:flex;justify-content:flex-end;">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous" @click="paginate('prev')">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li
          class="page-item"
          :class="{'active':activeItem == Number(x)}"
          v-for="x of totalPages"
          :key="x+Math.random()"
          @click="loadData(x)"
        >
          <a class="page-link" href="#">{{x}}</a>
        </li>
        <li class="page-item" @click="paginate('next')">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
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
      totalPages: {},
      activeItem: 1,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData(page = 1) {
      dao.url = `technologies?page=${page}`;
      dao.headers = {
        'Content-type': 'application/json',
      };
      this.activeItem = page;
      dao.get().then(({ data }) => {
        this.totalPages = Math.ceil(data.info.total / data.info.limit);
        delete data.info;
        this.tags = data;
      });
      dao.url = 'technologies';
    },
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
        this.tag.name = '';
        this.loadData();
      });
    },
    editTag(tag) {
      this.tag = { ...tag };
      this.buttonText = 'Edit tag';
    },
    deleteTag(tag) {
      dao.delete(tag.id).then(({ data }) => this.loadData());
    },
    paginate(option) {
      const index = this.activeItem;
      if (option == 'prev' && index - 1 <= this.totalPages && index - 1 >= 1) {
        this.activeItem = index - 1;
        this.loadData(this.activeItem);
      } else if (
        option == 'next' &&
        index + 1 <= this.totalPages &&
        index + 1 >= 1
      ) {
        this.activeItem = index + 1;
        this.loadData(this.activeItem);
      }
    },
  },
};
</script>

<style lang="scss">
.tags {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  border-radius: 5px;
  border: 1px solid #d5d5d5;
  .icon {
    padding: 5px;
    margin: 5px;
    &:hover {
      cursor: pointer;
    }
  }
  .header {
    background: #f8f9fa;
    height: 50px;
    margin-left: -15px;
    margin-right: -15px;
    border-bottom: 1px solid #d5d5d5;
    border-top-right-radius: 05px;
    border-top-left-radius: 05px;
  }
}
</style>
