import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Home from "./containers/Home";

Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router: new VueRouter({
    routes: [{ path: "/", component: Home }],
    mode: "history"
  })
}).$mount("#app");
