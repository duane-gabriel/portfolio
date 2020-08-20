<template>
  <div class="Projects w-100">
    <div class="row w-100">
      <form enctype="multipart/form-data" class="w-100">
        <div class="form-group">
          <label for="project_name">Nome</label>
          <input type="text" v-model="project.name" class="form-control" id="project_name" />
        </div>
        <div class="form-group">
          <label for="project_desc">Descrição</label>
          <textarea
            class="form-control"
            v-model="project.description"
            id="project_desc"
            rows="3"
          ></textarea>
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
            name="files"
            class="form-control-file"
            multiple
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
              <span class="btn btn-link p-0" @click="$emit('visible', index)">
                {{ file.name }}
              </span>
              <i class="fas fa-times close" @click="removeFile(file.name)"></i>
            </li>
          </ul>
        </div>
        <div class="form-group d-flex justify-content-end">
          <button @click.prevent="sendData()" class="btn btn-success">Add projeto</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import datepicker from 'vuejs-datepicker';
import { ptBR } from 'vuejs-datepicker/dist/locale';
import VueTagsInput from '@johmun/vue-tags-input';
/*eslint-disable */
export default {
  components: {
    datepicker,
    VueTagsInput,
  },
  data() {
    return {
      visible: false,
      tabs: 0,
      files: [],
      project: { tag: '' },
      pt: ptBR,

      tags: [],
      autocompleteItems: [
        {
          text: 'Spain',
        },
        {
          text: 'France',
        },
        {
          text: 'USA',
        },
        {
          text: 'Germany',
        },
        {
          text: 'China',
        },
      ],
    };
  },
  methods: {
    async sendData() {
      this.project.date = new Date(this.project.date).getTime();

      const data = new FormData();

      data.append('name', this.project.name);
      data.append('description', this.project.description);
      data.append('date', this.project.date);
      data.append('link', this.project.link);

      this.files.forEach((file) => data.append('files', file));
      this.$store.dispatch('saveProject', { project: data });
    },
    removeFile(name) {
      this.files = this.files.filter((file) => file.name !== name);
    },
  },
  watch: {
    files() {
      this.$store.state.files = this.files;
    },
  },
  mounted() {
    const Files = document.getElementById('project_files');
    const images = document.querySelector('#images');

    const that = this;
    Files.onchange = (e) => {
      that.files = [...Array.from(that.files), ...Array.from(e.target.files)];

      that.files.forEach((file) => {
        file.src = URL.createObjectURL(file);
      });
    };
    // document.querySelector('body').addEventListener('click', () => that.$emit('visible', false));
  },
  computed: {
    filteredItems() {
      return this.autocompleteItems.filter(
        (i) => i.text.toLowerCase().indexOf(this.project.tag.toLowerCase()) !== -1
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
