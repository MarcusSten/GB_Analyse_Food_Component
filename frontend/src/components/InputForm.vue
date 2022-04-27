<template>
  <div class="text">
    <h2>{{ title }}</h2>
    <v-textarea
        outlined
        auto-grow
        rows="8"
        label="Введите список ингредиентов, разделенных запятой"
        v-model="enteredText"
    ></v-textarea>
    <v-btn class="check-btn"
           color="teal lighten-1"
           elevation="3"
           x-large
           v-on:click="returnEnteredText"
    ><span style="color: white;">Проверить</span>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "InputForm",
  props: ['title'],
  data(){
    return{
      enteredText: "",
    }
  },
  methods:{
    returnEnteredText:function (){
      this.$emit('changeEnteredText', this.enteredText )
    }
  }
}
</script>

<style scoped>

</style>