<template>
  <div class="register-container">
    <div class="bx--grid bx--grid--full-width home">
      <h1 class="home__heading">Register</h1>

      <cv-toast-notification
        v-if="showErrorMessage"
        kind="error"
        :title="errorMessage"
        :low-contrast="true"
      ></cv-toast-notification>
      <br />
      <cv-form onsubmit="event.preventDefault();">
        <cv-text-input
          style="float:left;"
          class="firstName"
          label="First name"
          helper-text=""
          v-model="firstName"
          placeholder="Jane"
        >
          <template v-if="!firstNameValid" slot="invalid-message"
            >A first name is required</template
          >
        </cv-text-input>
        <cv-text-input
          style="float:right;"
          class="lastName"
          label="Last name"
          helper-text=""
          v-model="lastName"
          placeholder="Doe"
        >
          <template v-if="!lastNameValid" slot="invalid-message"
            >A last name is required</template
          >
        </cv-text-input>
        <br />
        <cv-text-input
          class="email"
          label="Email"
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
          label="Password"
          helper-text=""
          placeholder=""
          v-model="password"
          type="password"
          passwordHideLabel="Hide password"
          passwordShowLabel="Show password"
        >
          <template v-if="!passwordValid" slot="invalid-message">
            <div class="passwordErrorLayout">
              Please make sure password meets the following requirements:
            </div>
            <div class="passwordError">
              {{ passwordError }}
            </div>
          </template>
        </cv-text-input>
        <cv-text-input
          class="confirmPassword"
          label="Confirm password"
          helper-text=""
          placeholder=""
          v-model="confirmPassword"
          type="password"
          passwordHideLabel="Hide password"
          passwordShowLabel="Show password"
        >
          <template v-if="!confirmPasswordValid" slot="invalid-message"
            >Please make sure passwords match</template
          >
        </cv-text-input>
        <br />
        <cv-button kind="primary" class="btn_register" @click="register">
          Register
        </cv-button>
      </cv-form>
    </div>
  </div>
</template>

<style lang="scss">
.passwordErrorLayout {
  color: white;
}

.passwordError {
  margin-left: 1vw;
}

.home__heading {
  padding-bottom: 2vh;
}

.email,
.password {
  width: 20vw;
}

.btn_register {
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

.firstName {
  width: 10.5vw;
}

.lastName {
  width: 10.5vw;
}

.password {
  width: 22vw;
}

.email {
  width: 22vw;
}

@media only screen and (max-device-width: 480px) {
  .email,
  .password {
    width: 75vw;
  }

  .firstName {
    width: 38vw;
  }

  .lastName {
    width: 38vw;
  }

  .password {
    width: 80vw;
  }

  .email {
    width: 80vw;
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

.register-container {
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
  name: 'Register',
  title: 'Lyrics API - Register',
  components: {},
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      passwordError: '',
      errorMessage: '',
      firstNameValid: true,
      lastNameValid: true,
      emailValid: true,
      passwordValid: true,
      confirmPasswordValid: true,
      showErrorMessage: false
    };
  },
  watch: {
    firstName: function(val) {
      this.fnc_firstName(val);
    },
    lastName: function(val) {
      this.fnc_lastName(val);
    },
    email: function(val) {
      this.fnc_emailValid(val);
    },
    password: function(val) {
      this.fnc_passwordValid(val);
    },
    confirmPassword: function(val) {
      this.fnc_confirmPasswordValid(val);
    }
  },
  mounted: function() {
    document
      .getElementsByClassName(
        'bx--text-input--password__visibility__toggle bx--tooltip__trigger bx--tooltip--a11y bx--tooltip--bottom bx--tooltip--align-center'
      )[0]
      .setAttribute('tabIndex', '-1');
    document
      .getElementsByClassName(
        'bx--text-input--password__visibility__toggle bx--tooltip__trigger bx--tooltip--a11y bx--tooltip--bottom bx--tooltip--align-center'
      )[1]
      .setAttribute('tabIndex', '-1');
  },
  methods: {
    fnc_firstName(firstName) {
      if (firstName.length === 0) {
        this.firstNameValid = false;
      } else {
        this.firstNameValid = true;
      }
      return this.firstNameValid;
    },
    fnc_lastName(lastName) {
      if (lastName.length === 0) {
        this.lastNameValid = false;
      } else {
        this.lastNameValid = true;
      }
      return this.lastNameValid;
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
      this.passwordError = '';
      if (password.length < 8) {
        this.passwordError += '\t Password must be at least 8 characters';
        this.passwordValid = false;
      } else {
        this.passwordValid = true;
      }
      return this.passwordValid;
    },
    fnc_confirmPasswordValid(confirmPassword) {
      if (confirmPassword != this.password || confirmPassword.length === 0) {
        this.confirmPasswordValid = false;
      } else {
        this.confirmPasswordValid = true;
      }
      return this.confirmPasswordValid;
    },
    error_unknownError() {
      this.errorMessage = 'An Error Occured. Please try again later.';
      this.showErrorMessage = true;
    },
    error_alreadyExists() {
      this.errorMessage = 'Account already exists.';
      this.showErrorMessage = true;
    },
    register() {
      this.fnc_passwordValid(this.password);
      this.fnc_confirmPasswordValid(this.confirmPassword);
      this.fnc_emailValid(this.email);
      this.fnc_firstName(this.firstName);
      this.fnc_lastName(this.lastName);
      if (
        this.passwordValid &&
        this.emailValid &&
        this.confirmPasswordValid &&
        this.firstNameValid &&
        this.lastNameValid
      ) {
        axios
          .post('https://api.rpsh.me/v1/user/signup', {
            email: this.email,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName,
            role: 'user'
          })
          .then(res => {
            // Check status for 200 or 400
            if (res.status != 201) {
              //Error registering.
              if (res.data.message === 'Email already exists') {
                this.error_alreadyExists();
              } else {
                this.error_unknownError();
              }
            } else {
              // if status is 200 Do further processing.
              if (res.data.message === 'User created') {
                //Success.
                // localStorage.setItem('user', JSON.stringify(res.data));
                router.push('/Login');
              } else {
                this.error_unknownError();
              }
            }
          })
          .catch(err => {
            //Show error saying Error authenticating. Please try again later.
            if (err.response.status != 409) {
              this.error_unknownError();
            } else {
              this.error_alreadyExists();
            }
          });
      }
    }
  }
};
</script>
