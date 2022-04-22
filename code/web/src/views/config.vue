<template>
  <div class="config">
    <div class="search">
      <input
        type="search"
        id="client-id-name"
        v-model="search"
        @input="setSearch"
      />
      <datalist id="client-id-name">
        <option value="" v-for="client in clients" :key="client" />
      </datalist>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { ref, reactive, watch } from "vue";
import { apiUrl } from "@/config";

const source = axios.CancelToken.source();
const search = ref<string>();
let clients = reactive([]);
const setSearch: ((payload: Event) => void) | undefined = ({ target }) =>
  (search.value =
    (<HTMLInputElement | undefined>target)?.value || search.value);

watch(search, async () => {
  const { data } = await axios({
    url: `${apiUrl}/api/v1/searchClient`,
    cancelToken: source.token,
    params: { keyword: search.value },
  }).catch(() => ({ data: {} }));
  clients = <any>data || [];
});
</script>

<style lang="scss" scoped>
.config {
  padding: 1em;
  display: flex;
  justify-content: center;
}
</style>
