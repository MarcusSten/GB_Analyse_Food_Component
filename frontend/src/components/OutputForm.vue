<template>
  <v-card
      class="mx-auto"
      max-width="600"
  >
  <v-card-text>
    ИМЯ: {{ cardData.name }}
    <v-spacer></v-spacer>
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

  </v-card-text>
  </v-card>
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
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>