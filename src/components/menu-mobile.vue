<template>
  <div class="menu-mobile d-flex justify-content-between">
    <span class="text-white" @click="$route.name != 'Home' ? $router.push({name:'Home'}) : ''">
      Duane
      Faria
    </span>
    <div class="icon-hamburguer" @click="isAside = !isAside">
      <div class="menu-hamb-list"></div>
      <div class="menu-hamb-list"></div>
      <div class="menu-hamb-list"></div>
    </div>
    <aside class="position-absolute" :class="[isAside ? 'aside-active' : 'dwa']">
      <ul class="p-5">
        <li
          @click="setMenu(item)"
          :class="['mb-3 disable text-white',
        $store.state.menuIsActive == item.name ? 'font-weight-bold':'']"
          v-for="item of itens"
          :key="Math.random()+item.name"
        >{{item.name}}</li>
      </ul>
    </aside>
  </div>
</template>

<script>
/* eslint-disable*/
export default {
  props: ["itens"],
  data() {
    return {
      isAside: false
    };
  },
  methods: {
    setMenu(menuItem) {
      this.$store.dispatch("SET_MENU", {
        payLoad: { menuItem: menuItem.name }
      });

      if (this.$route.name != menuItem.link) {
        this.$router.push({ name: menuItem.link });
        this.isAside = false;
        return;
      }
      this.isAside = false;
      return;
    }
  }
};
</script>

<style  lang="scss">
.menu-mobile {
  $heightMenu: 40;
  $heightSide: $heightMenu - 10;
  background-color: $main_color;
  width: 100%;
  margin-top: -10px;
  height: $heightMenu + px;
  padding: 10px 20px !important;
  transition: all 0.44s ease-in-out;
  .gray {
    color: gray;
  }
  .icon-hamburguer {
    &:hover {
      cursor: pointer;
    }
    .menu-hamb-list {
      height: 3px;
      background: #fff;
      width: 20px;
      margin: 3px;
    }
  }
  overflow: hidden !important;
  aside {
    margin-top: $heightSide + px;
    background-color: $main_color;
    color: #fff;
    right: 0;
    width: 0;
    margin-right: -100%;
    transition: all 0.44s ease-in-out;
    display: none;
    ul li {
      list-style: none;
    }
    z-index: 9999;
  }
  .aside-active {
    height: 100%;
    width: 75%;
    display: block !important;
    margin-right: 0;
    transition: all 0.44s ease-in-out;
  }
}
</style>
