<template>
  <div class="Projects w-100">
    <div class="header d-flex justify-content-between align-items-center">
      <span class="ml-4" v-if="mode=='add'">Criação do projeto</span>
      <span class="ml-4" v-if="mode=='list'">Listagem de projetos</span>
      <span class="ml-4" v-else-if="mode=='edit'">Edição do projeto</span>

      <div>
        <button
          class="btn btn-outline-primary mr-4"
          style="padding: 5px; height: 35px; font-size: 13px;"
          @click="mode = 'list'"
          v-if="mode == 'add' || mode=='edit'"
        >Listar projetos</button>
        <button
          class="btn btn-outline-primary mr-4"
          style="padding: 5px; height: 35px; font-size: 13px;"
          @click="mode = 'add';clear()"
          v-if="mode == 'list' || mode=='edit'"
        >Cadastrar projeto</button>
      </div>
    </div>
    <div class="row my-3 mx-4">
      <form enctype="multipart/form-data" class="w-100" v-if="mode=='add' || mode=='edit'">
        <div class="form-group">
          <label for="project_name">Nome</label>
          <input type="text" v-model="project.name" class="form-control" id="project_name" />
        </div>
        <div class="form-group">
          <label for="project_desc">Descrição</label>
          <textarea class="form-control" v-model="project.description" id="project_desc" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label for="project_desc">Data de criação</label>
          <datepicker :language="pt" v-model="project.date" />
        </div>
        <div class="form-group">
          <label for="project_link">Link do preview</label>
          <input type="text" class="form-control" id="project_link" v-model="project.link" />
        </div>
        <div class="form-group">
          <div id="images"></div>
        </div>
        <div class="form-group">
          <label for="project_tag">Tecnologias utilizadas</label>
          <VueTagsInput
            v-model="project.tag"
            @tags-changed="(newTags) => (tags = newTags)"
            :tags="tags"
            :autocomplete-items="filteredItems"
            id="project_tag"
            style="width: 100%;"
          />
        </div>
        <div class="form-group">
          <label for="project_files" class="btn btn-info">Upload de anexos</label>
          <input
            type="file"
            ref="file"
            name="files"
            class="form-control-file"
            multiple
            @change="handleFileUpload()"
            id="project_files"
            style="display: none;"
          />
        </div>
        <div class="form-group">
          <ul>
            <li
              class="d-flex justify-content-between mb-1"
              v-for="(file, index) of files"
              :key="file.name + Math.random()"
            >
              <span class="btn btn-link p-0" @click="$emit('visible', index)">{{ file.name }}</span>
              <div>
                <i
                  class="fas fa-star cursor-pointer"
                  style="margin-top: -5px; margin-right: 5px;"
                  :id="'starFull' + index"
                  v-if="fileStar.id == index"
                ></i>
                <i
                  @click="setStar(index)"
                  class="far fa-star cursor-pointer"
                  style="margin-top: -5px; margin-right: 5px;"
                  :id="'starEmpty' + index"
                  v-else
                ></i>
                <i
                  class="fas fa-times close"
                  @click="removeFile(file.name)"
                  style="margin-top: 3px;"
                ></i>
              </div>
            </li>
          </ul>
        </div>
        <div class="form-group d-flex justify-content-end">
          <button @click.prevent="sendData()" class="btn btn-success" v-if="mode=='add'">Add projeto</button>
          <button
            @click.prevent="sendData()"
            class="btn btn-success"
            v-if="mode=='edit'"
          >Edit projeto</button>
        </div>
      </form>
      <projects-list v-if="mode=='list'" @change="alterMode($event)" />
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import dao, { Api } from '@/services/dao';
import datepicker from 'vuejs-datepicker';
import { ptBR } from 'vuejs-datepicker/dist/locale';
import VueTagsInput from '@johmun/vue-tags-input';
import projectsList from '@/components/project_list.vue';
import { required, minLength } from 'vuelidate/lib/validators';
export default {
  components: {
    datepicker,
    VueTagsInput,
    projectsList,
  },
  data: () => ({
    buttonText: 'Add projeto',
    visible: false,
    tabs: 0,
    files: [],
    project: { tag: '', name: '' },
    pt: ptBR,
    mode: 'add',
    tags: [],
    fileStar: {
      id: 0,
    },
    autocompleteItems: [
      {
        text: 'dwadwa',
      },
    ],
  }),
  // validations: {
  //   project: { name: { required, minLength: minLength(6) } },
  // },
  methods: {
    sendData() {
      this.project.date = new Date(this.project.date).getTime();

      const data = new FormData();

      data.append('name', this.project.name);
      data.append('description', this.project.description);
      data.append('date', this.project.date);
      data.append('link', this.project.link);
      data.append('indexFileStar', this.fileStar.id);

      this.tags.forEach((tag) => data.append('technologies', tag.text));

      this.files.forEach((file, index) => {
        data.append('files', file);
      });

      if (this.mode == 'edit') {
        this.project.indexFileStar = this.fileStar.id;
        this.project.Technologies = [...this.tags];
        Api.put('projects', this.project)
          .then(({ data }) => console.log(data))
          .catch((e) => console.log(e));
        return;
      }

      Api.post('projects', data)
        .then()
        .catch((e) => console.log(e));
      this.clear();
    },
    removeFile(name) {
      this.files = this.files.filter((file) => file.name !== name);
    },
    alterMode(project) {
      const that = this;
      this.project = project;
      this.project.tag = '';
      this.tags = [];
      this.project.date = new Date(this.project.dateClean);
      this.project.Technologies.forEach((t) => {
        that.tags.push({ id: t.id, text: t.name });
      });
      this.files = this.project.Files;
      this.mode = 'edit';
      this.buttonText = 'Edit project';
    },
    setStar(index) {
      this.fileStar.id = index;
    },
    clear() {
      this.project = { tag: '' };
      this.tags = [];
      this.files = [];
    },
    handleFileUpload() {
      const Files = this.$refs.file.files;
      const that = this;

      that.files = [...Array.from(that.files), ...Array.from(Files)];

      that.files.forEach((file) => {
        file.src = URL.createObjectURL(file);
      });
    },
  },
  watch: {
    files: {
      handler(val) {
        this.$store.state.files = this.files;
      },
      deep: true,
    },
  },
  mounted() {
    const that = this;
    dao.url = 'Technologies';
    dao.get().then(({ data }) => {
      const tags = Object.values(data);
      delete tags[tags.length - 1];
      tags.forEach((t, i) => {
        that.autocompleteItems[i] = {
          id: t.id,
          text: t.name,
        };
      });
    });
  },
  computed: {
    filteredItems() {
      return this.autocompleteItems.filter(
        (i) =>
          i.text.toLowerCase().indexOf(this.project.tag.toLowerCase()) !== -1
      );
    },
  },
};
</script>

<style lang="scss">
.vue-tags-input {
  max-width: unset !important;
  .ti-input {
    border-radius: 3px;
  }
  input {
    border-radius: 5px;
  }
}
.Projects {
  height: auto;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  .ti-selected-item,
  .ti-tag {
    background: $primary !important;
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
  .close {
    font-size: 20px;
    color: red;
    &:hover {
      cursor: pointer;
    }
  }
  .vue-tags-input {
    border-radius: 5px;
  }
  .vue-tags-input.ti-focus .ti-input {
    border: 1px solid $main_color;
  }
  .vdp-datepicker {
    input,
    .vue-tags-input .ti-input {
      color: #495057;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      padding: 5px 20px;
      &:focus {
        border: 1px solid $main_color !important;
      }
    }
  }
  #images {
    display: flex;
    flex-wrap: wrap;
    div {
      position: relative;
    }
    img {
      max-width: 300px;
      max-height: 200px;
      width: auto;
      height: auto;
      margin: 10px;
      position: relative;
    }
    span {
      font-size: 18px;
      color: red;
      position: absolute;
      right: 10px;
      top: 5px;
      z-index: 2;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
