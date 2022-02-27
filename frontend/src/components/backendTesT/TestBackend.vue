<template>
  <div>
    <button @click="getNamesList">Получить базу с названиями</button>
    <div class="list">
      <ul v-if="listNames">
        <li v-for="(item, idx) in listNames" :key="idx">
          <button @click="postHarmfulAdditive(item.id)">{{ item.id }}</button>
        </li>
      </ul>
      <div v-if="harmfulAdditive">
        <p>Название: {{ harmfulAdditive.name }}</p>
        <p>Описание: {{ harmfulAdditive.description }}</p>
        <p>Категория: {{ harmfulAdditive.category }}</p>
        <p>Происхождение: {{ harmfulAdditive.origin }}</p>
        <p>Вред: {{ harmfulAdditive.harm }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TextComp",
  data() {
    return {
      listNames: "",
      harmfulAdditive: "",
    };
  },
  methods: {
    async getNamesList() {
      await axios
        .get("http://localhost:3001/names")
        .then((res) => {
          this.listNames = res.data;
        })
        .catch((e) => {
          console.log("ERROR: " + e);
        });
    },
    async postHarmfulAdditive(id) {
      await axios
        .post("http://localhost:3001/info", {
          name: id,
        })
        .then((res) => {
          this.harmfulAdditive = res.data;
        })
        .catch((e) => {
          console.log("ERROR: " + e);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  gap: 50px;
}
</style>