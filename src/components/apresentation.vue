<!--  eslint-disable -->
<template>
  <div class="apresentation">
    <div class="container">
      <header class="d-flex">
        <div class="row w-lg-75" style="height:auto">
          <div class="col-lg-6 col-sm-12 d-flex justify-content-center">
            <div class="picture-frame">
                <img
                  src="https://st.depositphotos.com/1129232/5088/v/950/depositphotos_50880205-stock-illustration-vector-hipster-man-icon-hipster.jpg"
                  alt
                />
            </div>
          </div>
          <content class="text col-lg-6 col-sm-12">
            <h1>Duane Faria</h1>
            <small class="text-center">Programador :D</small>
            <div class="social-media">
              <div class="social-media-circle">
                <a href="https://www.instagram.com/duhh_gabriel/" target="_blank">
                  <!-- <img
                    class="img-fluid"
                    src="https://img.icons8.com/cotton/26/000000/instagram-new.png"
                  />-->
                  <i class="fab fa-instagram"></i>
                </a>
              </div>
              <div class="social-media-circle">
                <a href="https://www.linkedin.com/in/duane-faria-224886153/" target="_blank">
                <!-- <img class="img-fluid" src="https://img.icons8.com/ios/50/000000/linkedin-2.png" /> -->
                <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
              <div class="social-media-circle">
                <a href="https://github.com/duane-gabriel" target="_blank">
                  <!-- <img class="img-fluid" src="https://img.icons8.com/fluent/60/000000/github.png"/> -->
                  <i class="fab fa-github"></i>
                </a>
              </div>
            </div>
          </content>
        </div>
      </header>

      <div class="about">
        <div class="info d-flex row">
          <blockquote class="col-md-6 col-lg-6 col-xl-6">
            <p class="description-title">
              Sobre
              <span class="text-primary">mim</span>
            </p>Olá, muito prazer, meu nome é Duane. Eu gosto de livros, séries, games e tocar saxofone. Eu possuo conhecimentos em Reactjs, Vuejs, React Native, Nodejs e Php.
            <br />
            <a
              href="./duane-faria.pdf"
              download="duane-faria.pdf"
              class="mt-4 btn btn-info"
            >download curriculo</a>
          </blockquote>
          <section class="col-md-6 d-flex col-lg-6 col-xl-6 justify-content-center">
            <table class="w-75">
              <tr v-for="d of infos" class :key="d+Math.random()">
                <td>{{d.question}}</td>
                <td class="font-weight-font-weight-light">{{d.answer}}</td>
              </tr>
            </table>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      infos: [
        { question: 'Idade', answer: 21 },
        { question: 'Endereço', answer: 'São Paulo' },
        { question: 'E-mail', answer: 'duane.faria@etec.sp.gov.br' },
        { question: 'Celular', answer: '(11) 96504-5245' },
      ],
    };
  },
  mounted() {
    let txtEl = document.getElementsByTagName('small')[0];
    function type(el) {
      const txt = el.innerHTML.split('');
      el.innerHTML = '';
      txt.forEach((letra, i) => {
        setTimeout(() => {
          el.innerHTML += letra;
        }, 75 * i);
      });
    }

    type(txtEl);

    function erase(txtEl) {
      const ap = txtEl.innerHTML.split('');
      const ap2 = txtEl.innerHTML.split('');
      for (let i = ap.lengt; i != 0; i--) {
        let nt = ap2.slice(ap2.lastIndexOf(ap[i]), ap2.lastIndexOf(ap[i]) + 1);

        setTimeout(() => {
          txtEl.innerHTML = txtEl.innerHTML;
        }, 75 * i);
      }
    }
  },
};
</script>
<style lang="scss">
.apresentation {
  i {
    color: $main_color;
    font-size: 20px;
  }
  small:after {
    content: '|';
    margin-left: 5px;
    opacity: 1;
    animation: pisca 0.7s infinite;
  }

  @keyframes pisca {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }

  @media (min-width: 800px) {
    .w-lg-75 {
      width: 75%;
    }
  }
  header {
    justify-content: space-around;
    background: $main_color;
    border-top-left-radius: $border_radius;
    border-top-right-radius: $border_radius;
    color: white;
    min-height: 280px;
    .picture-frame {
      border: 2px solid white;
      height: 280px;
      width: 250px;
      margin-top: 35px;
      margin-bottom: -50px;
      position: relative;
      left: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      small {
        font-size: 1.2rem;
      }
      .social-media {
        margin-top: 15px;
        display: flex;
        justify-content: space-around;
        margin-bottom: 10px;
        &-circle {
          background: #fff;
          height: 35px;
          width: 35px;
          padding: 5px;
          border-radius: 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 10px;
          box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.1);
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }

  div.about {
    margin-top: 50px;
    .info {
      section {
        table tr:first-child {
          height: unset !important;
        }
        table tr {
          height: 50px;
        }
      }
    }
    blockquote {
      padding-left: 45px;
    }
    .description-title {
      font-size: 1.5rem;
    }
  }
  @media (max-width: 768px) {
    .picture-frame {
      margin-bottom: 15px !important;
    }
  }
  @media (max-width: 575px) {
    header {
      padding-bottom: 30px;
      content {
      }
    }
    div.about {
      blockquote {
        order: 1;
      }
      section {
        order: 0;
        table {
          width: 100% !important;
          margin: 0 27px;
          td {
            width: 100px;
          }
        }
      }
    }
  }
}
</style>
