<!--  eslint-disable -->
<template>
  <div class="apresentation">
    <div class="container">
      <header class="d-flex">
        <div class="row">
          <div class="col-lg-6 col-sm-12">
            <div class="picture-frame">
              <img
                src="https://st.depositphotos.com/1129232/5088/v/950/depositphotos_50880205-stock-illustration-vector-hipster-man-icon-hipster.jpg"
                alt
              />
            </div>
          </div>
          <content class="text col-lg-6 col-sm-12">
            <h1>Duane Faria</h1>
            <small class="text-center">programador</small>
            <div class="social-media">
              <div class="social-media-circle">
                <img
                  class="img-fluid"
                  src="https://img.icons8.com/cotton/64/000000/facebook-circled--v1.png"
                />
              </div>
              <div class="social-media-circle">
                <img
                  class="img-fluid"
                  src="https://img.icons8.com/cotton/26/000000/instagram-new.png"
                />
              </div>
              <div class="social-media-circle">
                <img class="img-fluid" src="https://img.icons8.com/ios/50/000000/linkedin-2.png" />
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
            </p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique maxime non eum eius,
            impedit enim recusandae delectus!
            <br />
            <a href="./curriculo.txt" download="curriculo.txt" class="mt-4 btn btn-info">download curriculo</a>
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
        { question: "Idade", answer: 21 },
        { question: "Endereco", answer: "São Paulo" },
        { question: "E-mail", answer: "duane_gabriel@hotmail.com" },
        { question: "Celular", answer: "(11) 97712-4554" }
      ]
    };
  }
};
</script>
<style lang="scss">
.apresentation {
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
      width: 400px;
      align-items: center;
      .social-media {
        margin-top: 15px;
        display: flex;
        justify-content: space-around;
        &-circle {
          background: #fff;
          height: 35px;
          width: 35px;
          padding: 5px;
          border-radius: 25px;
          display: flex;
          justify-content: center;
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
}
</style>
