<template>
  <div class="login-container">
    <div class="bx--grid bx--grid--full-width home">
      <h1 class="home__heading">Login</h1>

      <cv-toast-notification
        v-if="showErrorMessage"
        kind="error"
        :title="errorMessage"
        :low-contrast="true"
      ></cv-toast-notification>

      <cv-form onsubmit="event.preventDefault();">
        <cv-text-input
          class="email"
          label="Email:"
          helper-text=""
          v-model="email"
          placeholder="example@example.com"
        >
          <template v-if="!emailValid" slot="invalid-message"
            >A valid email is required</template
          >
        </cv-text-input>
        <cv-text-input
          class="password"
          label="Password:"
          helper-text=""
          placeholder=""
          v-model="password"
          type="password"
          passwordHideLabel="Hide password"
          passwordShowLabel="Show password"
        >
          <template v-if="!passwordValid" slot="invalid-message"
            >A valid password is required</template
          >
        </cv-text-input>
        <br />
        <cv-button kind="primary" class="btn_login" @click="login">
          Login
        </cv-button>
        <cv-button
          kind="secondary"
          class="btn_register"
          @submit.prevent="register"
          @click="register"
        >
          Register
        </cv-button>
      </cv-form>
    </div>
  </div>
</template>

<style lang="scss">
.home__heading {
  padding-bottom: 2vh;
}

.email,
.password {
  width: 20vw;
}

.btn_login {
  margin-right: 1vw;
}

.bx--toast-notification--low-contrast.bx--toast-notification--error {
  background-color: #303030;
  color: #f4f4f4;
  width: 20vw;
}

.bx--toast-notification__close-button {
  visibility: hidden;
}

@media only screen and (max-device-width: 480px) {
  .email,
  .password {
    width: 75vw;
  }

  .bx--toast-notification--low-contrast.bx--toast-notification--error {
    background-color: #303030;
    color: #f4f4f4;
    width: 75vw;
  }
}

input {
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
}

.login-container {
  height: calc(100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

#app {
  height: calc(100%);
}

html {
  height: calc(100%);
}

body {
  height: calc(100%);
}

.bx--content {
  height: calc(100%);
}

.bx--btn--primary,
.bx--btn--secondary {
  border-radius: 5px;
  text-align: center;
}
</style>

<script>
import axios from 'axios';
import router from '../../router';

export default {
  name: 'Login',
  title: 'Lyrics API - Login',
  components: {},
  watch: {
    email: function(val) {
      this.fnc_emailValid(val);
    },
    password: function(val) {
      this.fnc_passwordValid(val);
    }
  },
  mounted: function() {
    document
      .getElementsByClassName(
        'bx--text-input--password__visibility__toggle bx--tooltip__trigger bx--tooltip--a11y bx--tooltip--bottom bx--tooltip--align-center'
      )[0]
      .setAttribute('tabIndex', '-1');
  },
  methods: {
    login() {
      this.fnc_passwordValid(this.password);
      this.fnc_emailValid(this.email);
      if (this.passwordValid && this.emailValid) {
        axios
          .post('api/user/login', {
            email: this.email,
            password: this.password
          })
          .then(res => {
            console.log(res.headers)
            // Check status for 200 or 400
            if (res.status != 200) {
              //Password incorrect show error saying email or password incorrect.
              this.errorMessage = 'Email or password incorrect';
              this.showErrorMessage = true;
            } else {
              // if status is 200 Do further processing.
              if (res.data.token) {
                //Success.
                localStorage.setItem('user', JSON.stringify(res.data));
                router.go('/');
              } else {
                this.error_unknownAuth();
              }
            }
          })
          .catch(err => {
            //Show error saying Error authenticating. Please try again later.
            if (err.response.status != 401) {
              this.error_unknownAuth();
            } else {
              this.error_incorrectAuth();
            }
          });
      }
    },
    register() {
      router.push('/Register');
    },
    error_incorrectAuth() {
      this.errorMessage = 'Email or password incorrect';
      this.showErrorMessage = true;
    },
    error_unknownAuth() {
      this.errorMessage = 'Error Authenticating. Please try again later.';
      this.showErrorMessage = true;
    },
    fnc_emailValid(email) {
      if (
        !email.match(
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        )
      ) {
        this.emailValid = false;
      } else {
        this.emailValid = true;
      }
      return this.emailValid;
    },
    fnc_passwordValid(password) {
      if (password.length === 0) {
        this.passwordValid = false;
      } else {
        this.passwordValid = true;
      }
      return this.passwordValid;
    }
  },
  data() {
    return {
      passwordValid: true,
      emailValid: true,
      email: '',
      password: '',
      errorMessage: '',
      showErrorMessage: false
    };
  }
};
</script>
