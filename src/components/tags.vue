<template>
  <div class="tags">
    <form>
      <div class="form-group">
        <label for="tag_name">Nome</label>
        <input type="text" v-model="name" class="form-control" id="tag_name" />
      </div>
      <div class="form-group d-flex justify-content-end">
        <button @click.prevent="saveTag()" class="btn btn-success">Add tag</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
    };
  },
  methods: {
    saveTag() {
      console.log(this.name);
    },
  },
};
</script>

<style lang="scss">
.tags {
}
</style>
