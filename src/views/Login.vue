<template>
  <div>
    <img class="wave" src="@/assets/images/wave.png" alt="Background Image" />
    <div class="container2">
      <div class="img">
        <img src="@/assets/images/bg.svg" alt="Smartphone Image" />
      </div>
      <div class="login-container">
        <form action="index.html">
          <img src="@/assets/images/avatar.svg" alt="Avatar" />
          <h2>Bem vindo</h2>
          <div class="input-div one">
            <div class="i">
              <i class="fas fa-user"></i>
            </div>
            <div>
              <h5>e-mail</h5>
              <input v-model="user.email" class="input" type="email" />
            </div>
          </div>
          <div class="input-div two">
            <div class="i">
              <i class="fas fa-lock"></i>
            </div>
            <div>
              <h5>senha</h5>
              <input class="input" v-model="user.password" type="password" />
            </div>
          </div>
          <!-- <button
            @click.prevent="login"
            type="submit"
            class="btn"
            value="Entrar"
          >{{loading ? '<i class="fas fa-spinner spinner"></i>' : 'Entrar'}}</button>-->

          <button
            v-if="!loading"
            @click.prevent="login"
            type="submit"
            class="btn"
            value="Entrar"
          >Entrar</button>
          <button v-else @click.prevent="login" type="submit" class="btn" value="Entrar">
            <i class="fas fa-spinner spinner"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      loading: false,
    };
  },
  mounted() {
    const inputs = document.querySelectorAll('.input');

    function focusFunc() {
      const parent = this.parentNode.parentNode;
      parent.classList.add('focus');
    }

    function blurFunc() {
      const parent = this.parentNode.parentNode;
      if (this.value === '') {
        parent.classList.remove('focus');
      }
    }

    inputs.forEach((input) => {
      input.addEventListener('focus', focusFunc);
      input.addEventListener('blur', blurFunc);
    });
  },
  methods: {
    login() {
      this.loading = true;
      this.user.name = 'Duane';
      this.user.username = 'dfaria';

      this.$store.dispatch('LOGIN', { credentials: this.user }).then(() => {
        this.loading = false;
        this.$router.push({ name: 'Admin.projects' });
      });
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
}

.wave {
  position: fixed;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
}

.container2 {
  width: 100vw !important;
  height: 100vh !important;
  display: grid !important;
  grid-template-columns: repeat(2, 1fr) !important;
  grid-gap: 7rem !important;
  padding: 0 2rem !important;
}

.img {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.img img {
  width: 500px;
}

.login-container {
  display: flex;
  align-items: center;
  text-align: center;
}

form {
  width: 360px;
}

.login-container img {
  width: 100px;
}

form h2 {
  font-size: 2.9rem;
  text-transform: uppercase;
  margin: 15px 0;
  color: #333;
}

.input-div.one,
.input-div.two {
  position: relative;
  display: grid;
  grid-template-columns: 7% 93%;
  margin: 25px 0;
  padding: 5px 0;
  border-bottom: 2px solid #d9d9d9;
}

.input-div:after,
.input-div:before {
  content: '';
  position: absolute;
  bottom: -2px;
  width: 0;
  height: 2px;
  transition: 0.3s;
}

.input-div:after {
  right: 50%;
}

.input-div:before {
  left: 50%;
}

.input-div.focus {
  border-bottom: 2px solid #38d39f;
  transition: ease-in-out 0.8s;
}

.input-div.focus .i i {
  color: #38d39f;
}

.input-div.focus div h5 {
  top: -5px;
  font-size: 15px;
}

.input-div:after,
.input-div:before {
  width: 50%;
}

.input-div.one {
  margin-top: 0;
}

.input-div.two {
  margin-bottom: 4px;
}

.i {
  display: flex;
  justify-content: center;
  align-items: center;
}

.i i {
  color: #d9d9d9;
  transition: 0.3s;
}

.input-div > div {
  position: relative;
  height: 45px;
}

.input-div > div h5 {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 18px;
  transition: 0.3s;
}

.input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: none;
  outline: none;
  background: none;
  padding: 0.5rem 0.7rem;
  font-size: 1.2rem;
  font-family: 'Poppins', sans-serif;
  color: #555;
}

a {
  display: block;
  text-align: right;
  text-decoration: none;
  color: #999;
  font-size: 0.9rem;
  transition: 0.3s;
}

a:hover {
  color: #38d39f;
}

.btn {
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  margin: 1rem 0;
  font-size: 1.2rem;
  outline: none;
  border: none;
  background-image: linear-gradient(to right, #32be8f, #38d39f, #32be8f);
  cursor: pointer;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  background-size: 200%;
  transition: 0.5s;
}

.btn:hover {
  background-position: right;
}

@media screen and (max-width: 1050px) {
  .container {
    grid-gap: 5rem;
  }
}

@media screen and (max-width: 1000px) {
  form {
    width: 290px;
  }

  form h2 {
    font-size: 2.4rem;
    margin: 8px 0;
  }

  .img img {
    width: 400px;
  }
}

@media screen and (max-width: 900px) {
  .img {
    display: none;
  }

  .container {
    grid-template-columns: 1fr;
  }

  .wave {
    display: none;
  }

  .login-container {
    justify-content: center;
  }
}
</style>
