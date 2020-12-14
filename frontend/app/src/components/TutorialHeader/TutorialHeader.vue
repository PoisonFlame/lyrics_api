<template>
  <cv-header aria-label="Carbon header">
    <cv-header-menu-button aria-label="Header menu" aria-controls="side-nav" />
    <cv-skip-to-content href="#main-content">
      Skip to content
    </cv-skip-to-content>
    <cv-header-name href="/" prefix="Lyrics">
      API
    </cv-header-name>
    <cv-header-nav aria-label="Nav">
      <cv-header-menu-item href="api/docs/">
        Documentation
      </cv-header-menu-item>
      <cv-header-menu-item v-if="false" href="/status">
        Status
      </cv-header-menu-item>
    </cv-header-nav>
    <template slot="left-panels" v-if="areLeftPanels">
      <cv-side-nav id="side-nav" fixed>
        <cv-side-nav-items>
          <cv-header-side-nav-items>
            <cv-header-menu-item href="api/docs/">
              Documentation
            </cv-header-menu-item>
            <cv-header-menu-item v-if="false" href="/status">
              Status
            </cv-header-menu-item>
          </cv-header-side-nav-items>
        </cv-side-nav-items>
      </cv-side-nav>
    </template>
    <template slot="header-global">
      <cv-header-global-action
        aria-label="User avatar"
        aria-controls="user-panel"
      >
        <UserAvatar20 />
      </cv-header-global-action>
    </template>

    <template slot="right-panels" v-if="areRightPanels">
      <cv-header-panel id="user-panel">
        <cv-switcher>
          <cv-switcher-item>
            <cv-switcher-item-link :href="firstLink">
              {{ firstLinkText }}
            </cv-switcher-item-link>
          </cv-switcher-item>
          <cv-switcher-item>
            <cv-switcher-item-link :href="secondLink">
              {{ secondLinkText }}
            </cv-switcher-item-link>
          </cv-switcher-item>
        </cv-switcher>
      </cv-header-panel>
    </template>
  </cv-header>
</template>

<style lang="scss">
@import './carbon-overrides';
</style>

<script>
//  import Fade16 from '@carbon/icons-vue/es/fade/16';
import UserAvatar20 from '@carbon/icons-vue/es/user--avatar/20';
import { authInfo } from '../../helpers/auth-info';

// if(authInfo().email){
//   this.firstLink =  "/Profile";
//   this.firstLinkText = authInfo().firstName + " " + authInfo().lastName;
// }else{
//   this.firstLink =  "/Login";
//   this.firstLinkText = "Login";
//   this.secondLink = "/Register";
//   this.secondLinkText= "Register";
// }

export default {
  name: 'Header',
  components: {
    UserAvatar20
  },
  data() {
    return {
      areLeftPanels: true,
      areRightPanels: true,
      firstLink: '/Login',
      firstLinkText: 'Login',
      secondLink: '/Register',
      secondLinkText: 'Register'
    };
  },
  mounted: function() {
    this.fnc_firstLink();
    this.fnc_secondLink();
  },
  methods: {
    fnc_firstLink() {
      if (authInfo().email) {
        this.firstLink = '/Dashboard';
        this.firstLinkText = authInfo().firstName + ' ' + authInfo().lastName;
      } else {
        this.firstLink = '/Login';
        this.firstLinkText = 'Login';
      }
    },
    fnc_secondLink() {
      if (authInfo().email) {
        this.secondLink = '/Logout';
        this.secondLinkText = 'Logout';
      } else {
        this.secondLink = '/Register';
        this.secondLinkText = 'Register';
      }
    }
  }
};
</script>
