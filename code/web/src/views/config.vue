<template>
  <div class="configs">
    <div class="search">
      <input
        type="search"
        v-model="search"
        @input="setSearch"
        list="client-id-name"
      />
    </div>
    <div class="users" ref="usersEl">
      <div
        v-for="(item, index) in users.list"
        :key="index"
        :data-id="item.id"
        class="user"
      >
        <h1 v-text="item.id" class="id" />
        <div class="content">
          <div class="config" v-for="(key, index) in itemKey" :key="index">
            {{ toZh[key] }}:
            <Editable
              :value="item[key]"
              @input="(data) => (item[key] = data)"
            />
          </div>
          <div class="area">
            <div class="config" v-for="(_value, key) in item.area" :key="key">
              {{ toZh[key] }}:
              <Editable
                :value="item.area[key]"
                @input="(data) => (item.area[key] = data)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { ref, reactive, watch, onMounted } from "vue";

import Editable from "@/components/utils/editable.vue";
import { apiUrl } from "@/config";
import { userType } from "@/types/apiData";

const source = axios.CancelToken.source();
const search = ref<string>();
const usersEl = ref<HTMLDivElement>();
const users = reactive<{ list: userType[] }>({ list: [] });
const oldUsers = reactive<{ list: userType[] }>({ list: [] });

const setSearch: ((payload: Event) => void) | undefined = ({ target }) =>
  (search.value =
    (<HTMLInputElement | undefined>target)?.value || search.value);
const itemKey: ["name", "description"] = ["name", "description"];
const dataType = {
  name: void 0,
  description: void 0,
  location: { latitude: void 0, longitude: void 0 },
  area: { county: void 0, town: void 0, village: void 0 },
};
const toZh = {
  name: "名字",
  description: "描述",
  county: "縣",
  town: "區",
  village: "里",
};

watch(search, async () => {
  users.list = oldUsers.list = [];

  if (!search.value) return;
  const { data } = await axios({
    url: `${apiUrl}/api/v1/users/find`,
    cancelToken: source.token,
    params: { keyword: search.value },
  }).catch(() => ({ data: [] }));

  users.list = oldUsers.list = (<userType[]>data).map((k) => ({
    ...dataType,
    ...k,
  }));
});

onMounted(() => {
  if (!usersEl.value) return;
});
watch(users, (list) =>
  list.list.forEach((data) =>
    axios({
      url: `${apiUrl}/api/v1/users/${data.id}/edit`,
      method: "patch",
      data,
    })
  )
);
</script>

<style lang="scss" scoped>
.configs {
  padding: 1em 2em;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .users {
    width: 80%;
    color: white;
    .user {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      border: solid white 1px;
      border-radius: 8px;
      padding: 10px 0;
      margin: 1em 0;
      .id {
        text-align: center;
        writing-mode: vertical-rl;
      }
      .content {
        width: 80%;
      }
    }
  }
}
.alert {
  background-color: white;
  position: fixed;
  bottom: 2em;
  right: 10%;
  left: 10%;

  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 18pt;
  padding: 10px;

  border-radius: 5px;
  user-select: none;
  cursor: pointer;
  width: 80%;
  transition: background-color 1s cubic-bezier(0.2, 0.6, 0.9, 1);
  &:hover {
    background-color: #afafaf;
  }
}
</style>
