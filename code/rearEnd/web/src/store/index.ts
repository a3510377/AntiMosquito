import { createStore, useStore, Store } from "vuex";
import { InjectionKey } from "vue";
import { state, State } from "./state";
import getters from "./getters";
import mutations from "./mutations";

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state,
  getters,
  mutations,
});

export function getStore() {
  return {
    store: useStore(key),
  };
}
