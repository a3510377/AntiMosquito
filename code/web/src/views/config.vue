<template>
  <div class="config">
    <div class="search">
      <input
        type="search"
        v-model="search"
        @input="setSearch"
        list="client-id-name"
      />
    </div>
  </div>
  <div class="users">
    <div v-for="(item, index) in users.list" :key="index" :value="item.id">
      <Editable @input="(data) => (item.name = data)" :value="item.id" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { ref, reactive, watch } from "vue";

import Editable from "@/components/utils/editable.vue";
import { apiUrl } from "@/config";
import { userType } from "@/types/apiData";

const source = axios.CancelToken.source();
const search = ref<string>();
const users = reactive<{ list: userType[] }>({ list: [] });

const setSearch: ((payload: Event) => void) | undefined = ({ target }) =>
  (search.value =
    (<HTMLInputElement | undefined>target)?.value || search.value);

watch(search, async () => {
  users.list = [];

  if (!search.value) return;
  const { data } = await axios({
    url: `${apiUrl}/api/v1/users/find`,
    cancelToken: source.token,
    params: { keyword: search.value },
  }).catch(() => ({ data: [] }));

  users.list = <userType[]>data;
});
</script>

<style lang="scss" scoped>
.config {
  padding: 1em;
  display: flex;
  justify-content: center;
}
</style>
