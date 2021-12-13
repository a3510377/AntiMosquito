import { store, key } from "./store";
import { App } from "vue";
import router from "@/router";

export default {
  install(vue: App) {
    vue.use(store, key);
    vue.use(router);
  },
};
