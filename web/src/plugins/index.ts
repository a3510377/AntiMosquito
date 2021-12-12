import { store, key } from "./store";
import { App } from "vue";

export default {
  install(vue: App) {
    vue.use(store, key);
  },
};
