<template>
  <div class="resume d-flex justify-content-center">
    <div class="container">
      <div class="row">
        <header class="d-flex justify-content-center align-items-center">
          <h1 class="text-white">Curriculo</h1>
        </header>
      </div>
      <div class="row pl-lg-4 pl-3 pr-3">
        <div class="pt-4 pl-0 pl-sm-1 pl-md-4 pl-lg-4 col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <h2 class="font-weight-normal">Educação</h2>
            <timeline-item :data="education"/>
        </div>
        <div class="pt-4 pr-0 pr-sm-1 pr-md-4 pr-lg-4 col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <h2 class="font-weight-normal">Experiência</h2>
            <timeline-item :data="expirience"/>
        </div>
      </div>
      <div class="row">
        <div class="pt-3 col-sm-12 col-md-4 col-lg-4 col-xl-4 d-flex flex-column
        align-items-center
        justify-content-center">
          <h2 class="font-weight-normal mb-3">Backend <span class="text-primary">Skills</span></h2>
          <progressBar :data="back" v-for="back of backend" :key="Math.random()+back.title"/>
        </div>
        <div class="pt-3 col-sm-12 col-md-4 col-lg-4 col-xl-4 d-flex justify-content-center
        d-flex flex-column        align-items-center        justify-content-center">
          <h2 class="font-weight-normal mb-3">Frontend <span class="text-primary">Skills</span></h2>
          <progressBar :data="front" v-for="front of frontend" :key="Math.random()+front.title"/>
        </div>
        <div class="pt-3 col-sm-12 col-md-4 col-lg-4 col-xl-4 d-flex justify-content-center d-flex
        justify-content-center d-flex flex-column align-items-center justify-content-center">
          <h2 class="font-weight-normal  mb-3">Others <span class="text-primary">Skills</span></h2>
          <progressBar :data="other" v-for="other of others" :key="Math.random()+other.title"/>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import timelineItem from '@/components/timeline-item.vue';
import progressBar from '@/components/progress-bar.vue';

export default {
  components: { timelineItem, progressBar },
  data() {
    return {
      education: [
        {
          title: 'Curso técnico em informática',
          year: 'Jan 2015 - Dec 2017',
          institution: 'Centro Paula Souza (Etec)',
          description: 'Curso técnico em informática com ênfase em programação.',
        },
        {
          title: 'Engenharia da Computação',
          year: 'Jan 2018 - Atualmente',
          institution: 'Centro Universitário Eniac',
          description: 'Atualmente cursando o terceiro ano de engenharia da computação.',
        },
      ],
      expirience: [
        {
          title: 'Estágio em desenvolvimento de software',
          year: 'Set 2018 - Mar 2019',
          institution: 'hitcode',
          description: 'Estágio em dev',
        },
        {
          title: 'Programador Junior',
          year: 'Abr 2019 - Mar 2020',
          institution: 'fasters',
          description: 'Programador junior',
        },
      ],
      backend: [
        {
          title: 'Nodejs',
          percent: 50,
        },
        {
          title: 'Express',
          percent: 50,
        },
        {
          title: 'MySql',
          percent: 50,
        },
      ],
      frontend: [
        {
          title: 'Vuejs',
          percent: 60,
        },
        {
          title: 'Reactjs',
          percent: 35,
        },
        {
          title: 'Bootstrap',
          percent: 60,
        },
        {
          title: 'Jquery',
          percent: 65,
        },
      ],
      others: [
        {
          title: 'Git',
          percent: 50,
        },
        {
          title: 'Scrum/Kanban',
          percent: 40,
        },
        {
          title: 'Jira',
          percent: 39,
        },
      ],
    };
  },
};
</script>
<style scoped lang="scss">
.resume {
  header {
    background-color: $main_color !important;
    width: 100%;
    height: 120px;
    border-top-left-radius: $border_radius;
    border-top-right-radius: $border_radius;
  }
  h2 {
    font-size: 1.5rem;
  }
  .container{
    height: 900px !important;
    margin-bottom: 50px;
  }
  @media(max-width:500px){
    .container{
      height: auto !important;
      padding-bottom:20px;
    }
  }
}
</style>
