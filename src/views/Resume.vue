<template>
  <div class="resume d-flex justify-content-center">
    <div class="container">
      <div class="row">
        <header class="d-flex justify-content-center align-items-center">
          <h1 class="text-white">Curriculo</h1>
        </header>
      </div>
      <div class="row pl-4">
        <div class="pt-3 col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <h2 class="font-weight-normal">Educação</h2>
            <timeline-item :data="education"/>
        </div>
        <div class="pt-3 col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <h2 class="font-weight-normal">Experiência</h2>
            <timeline-item :data="expirience"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import timelineItem from '@/components/timeline-item.vue';

export default {
  components: { timelineItem },
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
    };
  },
};
</script>
<style scoped lang="scss">
.resume {
  header {
    h1 {
    }
    background-color: $main_color !important;
    width: 100%;
    height: 120px;
    border-top-left-radius: $border_radius;
    border-top-right-radius: $border_radius;
  }
  h2 {
    font-size: 1.5rem;
  }
}
</style>
