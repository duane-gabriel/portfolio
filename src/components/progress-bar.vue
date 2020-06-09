<template>
<div class="w-75 mt-2 ml-4 pl-4 d-flex flex-column">
  <label class="align-items-start">{{data.title}}</label>
  <div class="progress">
    <div
      class="progress-bar bg-success"
      role="progressbar"
      :style="'width:'+ data.percent +'%'"
      aria-valuenow="25"
      aria-valuemin="0"
      aria-valuemax="100"
    ></div>
  </div>
</div>
</template>

<script>
export default {
  props: ['data'],
};
</script>

<style scoped lang="scss">
  .progress{
    height: 07px;
    width:70%;
  }
</style>
