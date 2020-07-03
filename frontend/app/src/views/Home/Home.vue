<template>
  <div class="bx--grid bx--grid--full-width home">
    <div class="bx--row home__banner">
      <div class="bx--col-lg-16">
        <cv-breadcrumb noTrailingSlash aria-label="Page navigation">
        </cv-breadcrumb>
        <h1 class="home__heading">Get Song Lyrics with the Lyrics API</h1>
      </div>
    </div>
    <div
      class="bx--row home__r2"
      style="background-image:url('../../assets/main.png');"
    >
      <div class="bx--col bx--no-gutter">
        <!-- <cv-tabs selected="0" aria-label="Tab navigation">
      <cv-tab label="About"> -->
        <div class="bx--grid bx--grid--no-gutter bx--grid--full-width">
          <div class="bx--row home__tab-content">
            <div class="bx--col-md-4 bx--col-lg-7">
              <h2 class="home__subheading">What is Lyrics API?</h2>
              <p class="home__p">
                Lyrics API is an REST api that can be used to fetch lyrics and
                other metadata of songs by a few different parameters. Lyrics
                API uses Genius.com as its source for all the data and is a
                project used to delve into API creation.
              </p>
              <cv-button @click="btn_action">{{ btnLabel }}</cv-button>
            </div>

            <div class="imgg bx--col-md-4 bx--offset-lg-1 bx--col-lg-8">
              <img
                class="home__illo"
                src="../../assets/main.png"
                alt="Carbon illustration"
              />
            </div>
          </div>
        </div>
        <!-- </cv-tab>
      <cv-tab label="Design">
        <div class="bx--grid bx--grid--no-gutter bx--grid--full-width">
          <div class="bx--row home__tab-content">
            <div class="bx--col-lg-16">
              Rapidly build beautiful and accessible experiences. The Carbon kit
              contains all resources you need to get started.
            </div>
          </div>
        </div>
      </cv-tab>
      <cv-tab label="Develop">
        <div class="bx--grid bx--grid--no-gutter bx--grid--full-width">
          <div class="bx--row home__tab-content">
            <div class="bx--col-lg-16">
              Carbon provides styles and components in Vanilla, React, Angular,
              and Vue for anyone building on the web.
            </div>
          </div>
        </div>
      </cv-tab>
    </cv-tabs> -->
      </div>
    </div>
    <!-- //     <div class="bx--row home__r3">
//   <div class="bx--col-md-4 bx--col-lg-4">
//     <h3 class="home__label">The Principles</h3>
//   </div>
//   <div class="bx--col-md-4 bx--col-lg-4">Carbon is Open</div>
//   <div class="bx--col-md-4 bx--col-lg-4">Carbon is Modular</div>
//   <div class="bx--col-md-4 bx--col-lg-4">Carbon is Consistent</div>
// </div> -->
  </div>
</template>

<style lang="scss">
@import './carbon-overrides';
@import '../../styles/carbon-utils';
@import './mixins';

.home__banner {
  padding-top: $spacing-05;
  padding-bottom: $spacing-07 * 4;
}

.home__heading {
  @include carbon--type-style('productive-heading-05');
}

.home__r2 {
  margin-top: rem(-40px);
}

#app {
  height: calc(100%);
  overflow-x: hidden;
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

@media only screen and (max-device-width: 480px) {
  .bx--content {
    height: auto;
    // padding-bottom:5px;
  }

  html {
    height: auto;
  }

  .home__banner {
    padding-top: $spacing-05 * 0.2;
    padding-bottom: $spacing-07 * 0.2;
  }

  .imgg {
    padding-top: 4vh;
  }
}

.home__illo {
  border-radius: 25px;
}

.home__tab-content {
  padding-top: $layout-05;
  padding-bottom: $layout-05;
}

.home__subheading {
  @include carbon--type-style('productive-heading-03');
  @include carbon--font-weight('semibold');
}

.home__p {
  @include carbon--type-style('productive-heading-03');
  margin-top: $spacing-06;
  margin-bottom: $spacing-08;

  @include carbon--breakpoint-between((320px + 1), md) {
    max-width: 75%;
  }
}

.bx--btn--primary,
.bx--btn--secondary {
  border-radius: 5px;
  text-align: center;
}

.home__r3 {
  padding-top: $spacing-09;
  padding-bottom: $spacing-09;
}

.home__label {
  @include carbon--type-style('heading-01');
}
</style>

<script>
import router from '../../router';
import { loggedIn } from '../../helpers/auth-info';

export default {
  name: 'Home',
  title: 'Lyrics API - Home',
  components: {},
  data() {
    return {
      btnLabel: 'Sign up now'
    };
  },
  mounted: function() {
    if (loggedIn()) {
      this.btnLabel = 'Go to dashboard';
    } else {
      this.btnLabel = 'Sign up now';
    }
  },
  methods: {
    signup() {
      router.go('/Register');
    },
    dashboard() {
      router.go('/Dashboard');
    },
    btn_action() {
      if (!loggedIn()) {
        this.signup();
      } else {
        this.dashboard();
      }
    }
  }
};
</script>
