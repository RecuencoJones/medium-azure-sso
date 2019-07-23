<template>
  <div>
    <div v-if="account">
      Welcome {{ account.userName }}!
      <a href="#" @click="logout">Log out</a>
      <div>
        <input v-model="token" readonly/>
      </div>
    </div>
    <a v-else href="#" @click="login">Log in with SSO</a>
  </div>
</template>

<script>
import { auth, getToken } from '../config/auth';

export default {
  data() {
    return {
      account: null,
      token: null
    };
  },
  methods: {
    login() {
      auth.loginRedirect();
    },
    logout() {
      auth.logout();
    }
  },
  mounted() {
    this.account = auth.getAccount();

    if (this.account) {
      getToken().then((token) => {
        this.token = token;
      });
    }
  }
};
</script>
