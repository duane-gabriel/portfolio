<template>
  <div class="spinner-border text-primary" role="status">
    <i class="fas fa-spinner spinner"></i>
    <!-- <span class="ml-2">carregando...</span> -->
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.spinner {
  animation: spin 2s linear infinite;
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
