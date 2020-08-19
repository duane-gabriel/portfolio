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
import axios from 'axios';

export default {
  components: {
    datepicker,
  },
  data() {
    return {
      files: [],
      project: {},
      pt: ptBR,
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

      axios
        .post('http://localhost:3000/projects', data)
        .then((re) => console.log(re))
        .catch((e) => console.log(e));
    },
  },
  mounted() {
    console.log(this.$route.name);
    const Files = document.getElementById('project_files');
    const images = document.querySelector('#images');

    const that = this;
    Files.onchange = (e) => {
      that.files = [...Array.from(that.files), ...Array.from(e.target.files)];
      e.target.files.forEach((file, index) => {
        const html = document.createElement('div');

        html.innerHTML = `
        <span id="close${index}" data-index="${index}">
          <i class="fas fa-times"></i>
        </span>
        <img src="${URL.createObjectURL(file)}" id="image${index}"/>
        `;

        images.appendChild(html);
        const el = document.querySelector(`#close${index}`);

        el.addEventListener('click', function () {
          const i = this.getAttribute('data-index');
          this.parentNode.remove();
          const arr = Array.from(that.files);
          arr.splice(i, 1);
          that.files = arr;
          console.log(that.files);
        });
      });
    };
  },
};
</script>

<style lang="scss">
.Projects {
  .vdp-datepicker {
    input {
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
