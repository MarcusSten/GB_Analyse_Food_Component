<template>
    <div class="item-block">
      ОПИСАНИЕ: {{ cardData.description }}
      <v-spacer></v-spacer>
      КАТЕГОРИЯ: {{ cardData.category }}
      <v-spacer></v-spacer>
      ПРОИСХОЖДЕНИЕ: {{ cardData.origin }}
      <v-spacer></v-spacer>
      ВРЕД: {{ cardData.harm }}
      <v-spacer></v-spacer>
      ВЕЛИЧИНА ВРЕДА: {{ cardData.harmNum }}
      <v-spacer></v-spacer>
      ПОЛЬЗА: {{ cardData.benefit }}
      <v-spacer></v-spacer>
      ССЫЛКА: {{ cardData.link }}

    </div>
</template>

<script>
export default {
  name: "OutputForm",
  props: ["cardData", "test"],
  data(){
  return{
    reveal: false,
  }
  }
}
</script>

<style scoped>
  .item-block {
    text-align: left;
  }
</style>