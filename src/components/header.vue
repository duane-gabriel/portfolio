<template>
  <header class="menu d-flex justify-content-center">
    <div class="container d-flex justify-content-center">
      <span>
        Duane
        <span class="text-primary">Faria</span>
      </span>
      <ul>
        <li>home</li>
        <li>curriculo</li>
        <li>projetos</li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
header.menu {
  display: flex !important;
  margin-top: 35px;
  .container {
    /* padding-left: 50px; */
  }
  ul {
    /* width: 50%; */
    margin-left: 35%;
    display: flex;
    li {
      list-style: none;
      margin: 0 35px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  span:hover {
    cursor: pointer;
  }
}
</style>
