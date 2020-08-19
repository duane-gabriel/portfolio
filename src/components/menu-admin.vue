<template>
  <div class="Menu-admin">
    <ul class="list-group">
      <li
        class="list-group-item d-flex align-items-center"
        @click="setMenu(index)"
        v-for="(item, index) in menus"
        :key="item.name + Math.random()"
        :class="[item.active ? 'active' : '']"
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
        // {
        //   name: 'Usuários',
        //   icon: '<i class="far fa-user"></i>',
        // },
        {
          name: 'Projetos',
          icon: '<i class="fas fa-project-diagram"></i>',
          active: true,
          route: 'Admin.projects',
        },
        {
          name: 'Tags',
          icon: '<i class="fas fa-tags"></i>',
          active: false,
          route: 'Admin.tags',
        },
      ],
    };
  },
  methods: {
    setMenu(index) {
      this.menus.forEach((m, i) => {
        if (index !== i) m.active = false;
        else m.active = true;
      });
      if (this.$route.name === this.menus[index].route) return;
      this.$router.push({ name: this.menus[index].route });
    },
  },
};
</script>

<style lang="scss">
.Menu-admin {
  li.list-group-item:hover,
  .active {
    outline: none;
    border-color: #000;
    cursor: pointer;
    background-color: $main_color;
    span,
    i {
      color: #fff;
    }
  }
  span {
    i {
      font-size: 15px;
    }
  }
}
</style>
