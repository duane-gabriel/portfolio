<template>
  <header class="menu d-flex justify-content-center">
    <div class="container d-flex justify-content-center" v-if="!mobile">
      <span
        class="title"
        @click="setMenu(menuItens[0]);
      $route.name != 'Home' ? $router.push({name:'Home'}) : ''"
      >
        Duane
        <span class="text-primary title">Faria</span>
      </span>
      <ul>
        <li
          :class="[ $store.state.menuIsActive == item.name ? 'active' : '','menuItem']"
          v-for="item of menuItens"
          @mouseover="hover(1,$event)"
          @mouseout="hover(0,$event)"
          :key="Math.random()+item.name"
          @click="setMenu(item)"
        >{{item.name}}</li>
      </ul>
    </div>
    <menuMobile v-if="mobile" :itens="menuItens"></menuMobile>
  </header>
</template>

<script>
/* eslint-disable */
import menuMobile from "@/components/menu-mobile.vue";
export default {
  components: {
    menuMobile
  },
  data() {
    return {
      mobile: false,
      menuItens: [
        { name: "home", link: "Home" },
        { name: "curriculo", link: "Resume" },
        { name: "projetos", link: "Projects" }
      ],
      isHover: ""
    };
  },
  mounted() {
    this.isMobile();
    window.addEventListener("resize", () => {
      this.isMobile();
    });
  },
  methods: {
    isMobile() {
      this.mobile = window.innerWidth <= 768 ? true : false;
    },
    setMenu(menuItem) {
      this.$store.dispatch("SET_MENU", {
        payLoad: { menuItem: menuItem.name }
      });

      if (this.$route.name != menuItem.link) {
        this.$router.push({ name: menuItem.link });
        return;
      }
      return;
    },
    hover(op, event) {
      if (op == 1) {
        event.target.classList.add("hover");
        return;
      }
      event.target.classList.remove("hover");
    }
  }
};
</script>

<style scoped lang="scss">
header.menu {
  display: flex !important;
  margin-top: 35px;
  .container {
    margin-top: unset !important;
    border-radius: unset !important;
    background-color: unset !important;
    min-height: unset !important;
    padding: unset !important;
    box-shadow: unset !important;
  }
  ul {
    /* width: 50%; */
    margin-left: 35%;
    display: flex;
    li {
      list-style: none;
      margin: 0 35px;
      color: gray;
      &:hover {
        cursor: pointer;
        border-bottom-width: 10px;
        border-bottom: 50% solid $main_color;
        transition: 0.5ms;
      }
    }
  }
  span:hover {
    cursor: pointer;
  }
  .hover {
    position: relative;
    color: #000;
  }
  .hover::after {
    content: "";
    height: 2px;
    width: 50%;
    background: $main_color;
    position: absolute;
    bottom: -03px;
    transition: width 2s linear 5s;
    left: 25%;
  }
  .active
  /* .hover  */
 {
    color: unset;
    position: relative;
    &::after {
      content: "";
      height: 2px;
      width: 50%;
      background: $main_color;
      position: absolute;
      bottom: -03px;
      left: 25%;
    }
  }
  .title {
    font-family: "Montserrat", sans-serif;
    font-size: 1rem;
    font-weight: 500;
  }
}
@media (max-width: 576px) {
  header.menu {
    margin-top: 0 !important;
    margin-bottom: 15px;
  }
}
</style>
