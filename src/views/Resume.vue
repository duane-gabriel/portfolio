<template>
  <div class="resume d-flex justify-content-center">
    <div class="container">
      <div class="row">
        <header class="d-flex justify-content-center align-items-center">
          <h1 class="text-white">Currículo</h1>
        </header>
      </div>
      <div class="row pl-lg-4 pl-3 pr-3">
        <div class="pt-4 pl-3 pl-sm-1 pl-md-4 pl-lg-4 col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <h2 class="font-weight-normal">Educação</h2>
          <timeline-item :data="education" />
        </div>
        <div class="pt-4 pr-0 pr-sm-1 pr-md-4 pr-lg-4 col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <h2 class="font-weight-normal">Experiência</h2>
          <timeline-item :data="expirience" />
        </div>
      </div>
      <div class="row" v-if="showSkills">
        <div
          class="pt-3 col-sm-12 col-md-4 col-lg-4 col-xl-4 d-flex flex-column align-items-center justify-content-center"
        >
          <h2 class="font-weight-normal mb-3">
            Backend
            <span class="text-primary">Skills</span>
          </h2>
          <progressBar :data="back" v-for="back of backend" :key="Math.random() + back.title" />
        </div>
        <div
          class="pt-3 col-sm-12 col-md-4 col-lg-4 col-xl-4 d-flex justify-content-center d-flex flex-column align-items-center justify-content-center"
        >
          <h2 class="font-weight-normal mb-3">
            Frontend
            <span class="text-primary">Skills</span>
          </h2>
          <progressBar :data="front" v-for="front of frontend" :key="Math.random() + front.title" />
        </div>
        <div
          class="pt-3 col-sm-12 col-md-4 col-lg-4 col-xl-4 d-flex justify-content-center d-flex justify-content-center d-flex flex-column align-items-center justify-content-center"
        >
          <h2 class="font-weight-normal mb-3">
            Others
            <span class="text-primary">Skills</span>
          </h2>
          <progressBar :data="other" v-for="other of others" :key="Math.random() + other.title" />
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
  mounted() {
    this.education.reverse();
    this.expirience.reverse();
  },
  data() {
    return {
      showSkills: false,
      education: [
        {
          title: 'Curso técnico em informática',
          year: 'Jan 2015 - Dec 2017',
          institution: 'Centro Paula Souza (Etec)',
          description: `Curso técnico em informática com ênfase em
          programação, 3 anos de duração. Nessa instituição foise ensinado lógica de programação, programação
          orientada a objetos e banco de dados, usando as
          linguagens: Java, C#, PHP, Javascript e MySql.`,
        },
        {
          title: 'Engenharia da computação',
          year: 'Jan 2018 - Atualmente',
          institution: 'Centro Universitário Eniac',
          description: 'Curso iniciado em 2018, sendo feito com bolsa de estudos integral, obtida através do Enem.',
        },
      ],
      expirience: [
        {
          title: `Estágio em desenvolvimento de software
`,
          year: 'Set 2018 - Abr 2019',
          institution: 'Hitcode',
          description:
          `No decorrer do estágio foram utilizadas as tecnologias
          Html, Css 3, Javascript Es6, Bootstrap 3 e 4, Jquery e
          Php 7. Desenvolveu-se um projeto de customer
          service, contendo crud, integração com api e duas
          dashboards, as quais possuiam gráficos das bibliotecas
          morris.js e charts.js.
          `,
        },
        {
          title: 'Programador junior',
          year: 'Mai 2019 - Jul 2019',
          institution: 'Belga informática',
          description:
            'Atuou-se em um projeto web de locação de imóveis, - primeiravista.com.br – utilizando-se das tecnologias, Html, Css, Javascript, Boostrap, Jquery, Ajax, Php e Slim Framework.',
        },
        {
          title: 'Programador junior',
          year: 'Ago 2019 - Abr 2020',
          institution: 'Fasters',
          description:
            'Trabalhou-se com projetos usando as tecnologias Bootstrap 4, Javascript, Vuejs, NodeJs, Php 7, MySql e SqlServer. Os projetos eram geridos utilizando metodologias ágeis.',
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
  head: {
    title: {
      inner: 'Currículo',
    },
  },
};
</script>
<style scoped lang="scss">
.resume {
  h1 {
    font-family: 'Montserrat', sans-serif;
  }
  header {
    background-color: $main_color !important;
    width: 100%;
    height: 120px;
    border-top-left-radius: $border_radius;
    border-top-right-radius: $border_radius;
    margin: 0 15px;
  }
  h2 {
    font-size: 1.5rem;
  }
  .container {
    height: 900px !important;
    margin-bottom: 50px;
  }
  @media (max-width: 500px) {
    .container {
      height: auto !important;
      padding-bottom: 20px;
    }
  }
}
</style>
