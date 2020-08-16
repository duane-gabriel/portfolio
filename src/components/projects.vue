<template>
  <div class="Projects">
    <form @submit.prevent="sendData" enctype="multipart/form-data">
      <div class="form-group">
        <label for="project_name">Nome</label>
        <input type="text" class="form-control" id="project_name" />
      </div>
      <div class="form-group">
        <label for="project_desc">Descrição</label>
        <textarea class="form-control" id="project_desc" rows="3"></textarea>
      </div>
      <div class="form-group">
        <label for="project_desc">Data de criação</label>
      </div>
      <div class="form-group">
        <label for="project_link">Link do preview</label>
        <input type="text" class="form-control" id="project_link" />
      </div>
      <div class="form-group">
        <div id="images"></div>
      </div>
      <div class="form-group">
        <label for="project_files">Arquivos</label>
        <input type="file" name="files" class="form-control-file" multiple id="project_files" />
      </div>
      <div class="form-group d-flex justify-content-end">
        <button class="btn btn-success">Add projeto</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    sendData(e) {
      console.log(e);
    },
  },
  mounted() {
    const files = document.getElementById('project_files');
    const images = document.querySelector('#images');

    files.onchange = (e) => {
      console.log(e.target.files);
      e.target.files.forEach((file, index) => {
        const img = images.appendChild(document.createElement('img'));
        const id = `image${index}`;
        img.setAttribute('id', id);
        document.getElementById(id).src = URL.createObjectURL(file);
      });
    };
  },
};
</script>

<style lang="scss">
.Projects {
  #images {
    img {
      max-width: 200px;
      max-height: 150px;
      width: auto;
      height: auto;
      margin: 10px;
    }
  }
}
</style>
