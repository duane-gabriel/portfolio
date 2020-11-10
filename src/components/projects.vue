<template>
  <div class="Projects w-100">
    <div class="header d-flex justify-content-between align-items-center">
      <span class="ml-4" v-if="mode == 'add'">Criação do projeto</span>
      <span class="ml-4" v-if="mode == 'list'">Listagem de projetos</span>
      <span class="ml-4" v-else-if="mode == 'edit'">Edição do projeto</span>

      <div>
        <button
          class="btn btn-outline-primary mr-4"
          style="padding: 5px; height: 35px; font-size: 13px;"
          @click="
            mode = 'list';
            clear();
          "
          v-if="mode == 'add' || mode == 'edit'"
        >Listar projetos</button>
        <button
          class="btn btn-outline-primary mr-4"
          style="padding: 5px; height: 35px; font-size: 13px;"
          @click="
            mode = 'add';
            clear();
          "
          v-if="mode == 'list' || mode == 'edit'"
        >Cadastrar projeto</button>
      </div>
    </div>
    <div class="row my-3 mx-4">
      <form enctype="multipart/form-data" class="w-100" v-if="mode == 'add' || mode == 'edit'">
        <div class="form-group">
          <label for="project_name">Nome</label>
          <input type="text" v-model="project.name" class="form-control" id="project_name" />
          <small
            class="text-danger"
            v-if="$v.project.name.$error && !$v.project.name.required"
          >campo obrigatório *</small>
        </div>
        <div class="form-group">
          <label for="project_desc">Descrição</label>
          <textarea class="form-control" v-model="project.description" id="project_desc" rows="3"></textarea>
          <small
            class="text-danger"
            v-if="$v.project.description.$error && !$v.project.description.required"
          >campo obrigatório *</small>
        </div>
        <div class="form-group">
          <label for="project_desc">Data de criação</label>
          <datepicker :language="pt" v-model="project.date" :value="project.date" />
          <small
            class="text-danger"
            v-if="$v.project.date.$error && !$v.project.date.required"
          >campo obrigatório *</small>
        </div>
        <div class="form-group">
          <label for="project_link">Link do preview</label>
          <input type="text" class="form-control" id="project_link" v-model="project.link" />
          <small
            class="text-danger"
            v-if="$v.project.link.$error && !$v.project.link.required"
          >campo obrigatório *</small>
        </div>
        <div class="form-group">
          <label for="project_link">Link do repositório</label>
          <input type="text" class="form-control" id="project_link" v-model="project.repository" />
          <small
            class="text-danger"
            v-if="$v.project.repository.$error && !$v.project.repository.required"
          >campo obrigatório *</small>
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
          <small class="text-danger" v-if="$v.tags.$error && !$v.tags.required">campo obrigatório *</small>
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
        <div class="form-group" v-if="files.length > 0">
          <span class="h6 mb-4">Imagens</span>
          <ul>
            <li
              class="d-flex justify-content-between mb-1"
              v-for="(file, index) of files.filter((f) => f.name.indexOf('mp4') === -1)"
              :key="file.name + Math.random()"
            >
              <span class="btn btn-link p-0" @click="$emit('visible', index)">
                {{
                file.name.toLowerCase()
                }}
              </span>
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
            <li style="list-style: none;">
              <small>
                <i class="fas fa-star cursor-pointer" style="margin-top: -5px; margin-right: 5px;"></i>
                Significa o arquivo que será capa do projeto.
              </small>
            </li>
          </ul>

          <ul v-if="files.filter((f) => f.name.indexOf('mp4') !== -1).length > 0">
            <span class="h6 mb-4">Vídeos</span>
            <li
              class="d-flex justify-content-between mb-1"
              v-for="file of files.filter((f) => f.name.indexOf('mp4') !== -1)"
              :key="file.name + Math.random()"
            >
              <span class="btn btn-link p-0" @click="$emit('visible', index)">{{ file.name }}</span>

              <i class="fas fa-times close" @click="removeFile(file.name)" style="margin-top: 3px;"></i>
            </li>
          </ul>
        </div>
        <small
          class="text-danger"
          v-if="$v.files.$error && !$v.files.required"
        >insira no mínimo um anexo *</small>
        <div class="form-group d-flex justify-content-end">
           <button
            @click.prevent="sendData()"
            class="btn btn-success"
            v-if="mode == 'add'"
            :disabled="loading"
          > {{loading ? '' : 'Add projeto'}}
          <i class="fas fa-spinner spinner" v-if="loading && mode == 'add'"></i>
          </button>
          <button
            @click.prevent="update()"
            class="btn btn-success"
            v-if="mode == 'edit'"
            :disabled="loading"

          >
          {{loading ? '' : 'Editar projeto'}}
          <i class="fas fa-spinner spinner" v-if="loading && mode == 'edit'"></i>
          </button>
        </div>
      </form>
      <projects-list v-if="mode == 'list'" @change="alterMode($event)" />
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
import { required } from 'vuelidate/lib/validators';
import { parse, parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import spinner from '@/components/spinner.vue';
export default {
  components: {
    datepicker,
    VueTagsInput,
    projectsList,
    spinner
  },
  data: () => ({
    buttonText: 'Add projeto',
    loading:false,
    visible: false,
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
        text: '...',
      },
    ],
    filesUpload: [],
  }),
  validations: {
    project: {
      name: { required },
      description: { required },
      link: { required },
      date: { required },
      repository: {
        required,
      },
    },
    tags: { required },
    files: {
      required,
    },
  },
  methods: {
    sendData() {
      this.$v.$touch();
      if (this.$v.$error) {
        return;
      }
      this.loading = true;
      this.project.date = new Date(this.project.date).getTime();

      const data = new FormData();

      data.append('name', this.project.name);
      data.append('description', this.project.description);
      data.append('date', this.project.date);
      data.append('link', this.project.link);
      data.append('repository', this.project.repository);
      data.append('indexFileStar', this.fileStar.id);

      this.tags.forEach((tag) => data.append('technologies', tag.text));

      this.files.forEach((file, index) => {
        data.append('files', file);
      });

      const that = this;
      Api.post('projects', data)
        .then((res) => {
          this.$message.success('Projeto cadastrado', {
            duration: 3000,
          });
          that.clear();
          that.$v.$reset();
          that.loading = false;
        })
        .catch((e) => console.log(e));

    },
    async update() {

      this.project.date = new Date(this.project.date).getTime();
      this.project.indexFileStar = this.fileStar.id;

      this.project.Technologies = [...this.tags];
      this.loading = true;
      const data = new FormData();
      if (this.filesUpload.length > 0) {
        this.filesUpload.forEach((f) => data.append('files', f));
        const { data: res } = await Api.post('files', data);
        this.project.filesUpload = res.files;
      }
      Api.put('projects', this.project)
        .then((res) => {
          console.log(res);
          this.$message.success('Projeto atualizado', {
            duration: 3000,
          });
          this.loading = false;
        })
        .catch((e) => console.log(e));
    },
    removeFile(name) {
      this.files = this.files.filter((file) => file.name !== name);
    },
    alterMode(project) {
      const that = this;
      this.project = project;
      this.project.tag = '';
      this.tags = [];

      this.project.date = format(new Date(this.project.date), 'yyyy M d', {
        locale: pt,
      });

      this.project.Technologies.forEach((t) => {
        that.tags.push({ id: t.id, text: t.name });
      });
      this.files = this.project.Files;

      this.files.forEach((f, i) => {
        if (f.star) this.fileStar.id = i;
        console.log(f);
      });

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
      this.fileStar.id = 0;
      this.filesUpload = [];
    },
    handleFileUpload() {
      const Files = this.$refs.file.files;
      const that = this;

      that.files = [...Array.from(that.files), ...Array.from(Files)];
      // console.log(that.files);

      that.files.forEach((file) => {
        if (!file.url) {
          file.src = URL.createObjectURL(file);
        }
      });
      if (this.mode == 'edit') {
        this.filesUpload = [...this.filesUpload, ...Array.from(Files)];
      }
    },
  },
  watch: {
    files: {
      handler(newFiles, oldFiles) {
        this.$store.state.files = this.files;
      },
      deep: true,
    },
  },
  mounted() {
    const that = this;
    dao.url = 'Technologies?limit=10000';
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
