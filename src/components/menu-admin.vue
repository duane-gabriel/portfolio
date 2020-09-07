<template>
  <div class="Menu-admin">
    <ul class="list-group">
      <li
        class="list-group-item d-flex align-items-center"
        @click="setMenu(index,item.name)"
        v-for="(item,index) in menus"
        :key="item.name + Math.random()"
        :class="[item.name == $store.state.menuAdmin ? 'active' : '']"
      >
        <span :class="['mr-2']" v-html="item.icon"></span>
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  data() {
    return {
      menus: [
        {
          name: 'Projetos',
          icon: '<i class="fas fa-project-diagram"></i>',
          route: 'Admin.projects',
        },
        {
          name: 'Tags',
          icon: '<i class="fas fa-tags"></i>',
          route: 'Admin.tags',
        },
      ],
    };
  },
  methods: {
    setMenu(index, name) {
      this.$store.dispatch('setMenuAdmin', { menuAdmin: name });
      if (this.$route.name === this.menus[index].route) return;
      this.$router.push({ name: this.menus[index].route });
    },
  },
};
</script>

<style lang="scss">
.Menu-admin {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  li.list-group-item:hover {
    outline: none !important;
    border-color: #000 !important;
    cursor: pointer !important;
    background-color: $main_color;
  }
  .active {
    outline: none !important;
    border-color: #000 !important;
    cursor: pointer !important;
    background-color: $main_color;
  }

  span {
    i {
      font-size: 15px;
    }
  }
}
</style>
