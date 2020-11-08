<template>
  <div class="project-list w-100">
    <spinner v-if="spinner" class="d-flex justify-content-center" />
    <div class="wrap-table100" v-else @dragover="containerDragOver($event)">
      <div class="table">
        <div class="row header bg-primary">
          <div class="cell pr-4">Id</div>
          <div class="cell">Nome</div>
          <div class="cell pr-4">Data</div>
          <div class="cell">Link</div>
          <div class="cell pr-4">Ações</div>
        </div>

        <div class="row draggable" v-for="(p) of projects" :key="p.id" @dragstart="dragstart($event,p.position)" @dragenter="dragenter($event)" @dragover.prevent="dragover($event)"
        draggable @dragend="dragend($event)" @drop.stop="(e)=>drop(e,p.position)">
          <div class="cell">{{ p.id }}</div>
          <div class="cell">{{ p.name }}</div>
          <div class="cell">{{ Format(new Date(p.date)) }}</div>
          <div class="cell">
            <a :href="p.link" target="_blank">{{ p.link }}</a>
          </div>
          <div class="cell">
            <i
              class="fas fa-pencil-alt icon rounded text-white"
              @click="alter(p)"
              style="background: green;"
            ></i>
            <i
              @click="deleteProject(p.id)"
              class="far fa-trash-alt icon rounded text-white"
              style="background: tomato;"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import api from '@/services/api';
import dao from '@/services/dao';
import spinner from '@/components/spinner.vue';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

export default {
  components: {
    spinner,
  },
  data() {
    return {
      projects: [],
      spinner: false,
    };
  },
  mounted() {
    this.requestProjects();
  },
  methods: {
    drop(e,toIndex){

      let itemsToUpdate = [];

      const fromIndex = Number(e.dataTransfer.getData('fromIndex'));
      console.log('Vindo de  ',fromIndex)
      console.log('Indo para ',toIndex)


      console.log(this.projects[this.projects.findIndex(({position}) => position == fromIndex)]);
      console.log(this.projects[this.projects.findIndex(({position}) => position == toIndex)]);

      // this.projects[this.projects.findIndex(({position}) => position == fromIndex)].position = toIndex;

      // this.projects[this.projects.findIndex(({position}) => position == toIndex)].position = fromIndex;

      // this.projects.position = toIndex;
      // this.projects[toIndex].position = fromIndex;

      itemsToUpdate.push({id:this.projects[fromIndex].id,position:toIndex});
      itemsToUpdate.push({id:this.projects[toIndex].id,position:fromIndex});
      console.log(itemsToUpdate);

      const projectToMove = this.projects.splice(fromIndex,1)[0]
      this.projects.splice(toIndex,0,projectToMove);

      // itemsToUpdate.forEach( (itemToUpdate)=> {
      //    dao.put({id:itemToUpdate.id, position:itemToUpdate.position}).then((res)=> console.log(res));
      // });
    },
    containerDragOver(e){
    },
    dragstart(e,index){
      e.dataTransfer.dropEffect  = 'move';
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('fromIndex', index);
    },
    dragenter(e){
    },
    dragover(e){
    },
    dragend(e){
    },
    requestProjects() {
      dao.url = 'projects';
      this.spinner = true;
      dao.get().then(({ data }) => {
        this.projects = data;
        this.spinner = false;
      });
    },
    alter(project) {
      this.$emit('change', project);
    },
    deleteProject(id) {
      const that = this;
      api
        .delete('projects/' + id)
        .then(({ data: id }) => {
          that.projects = that.projects.filter((p) => p.id !== Number(id));
        })
        .catch((e) => console.log(e));
    },
    Format(date) {
      return format(date, 'd/MM/yyyy', { locale: pt });
    },
  },
};
</script>

<style lang="scss">
.project-list {
  .icon {
    padding: 5px;
    margin: 5px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
