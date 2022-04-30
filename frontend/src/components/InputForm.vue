<template>
  <div class="text">
    <h2>{{ title }}</h2>
    <v-textarea
        outlined
        auto-grow
        rows="8"
        label="Введите список ингредиентов, разделенных запятой"
        v-model="enteredText"
        :class="{ hideInput: isMobile === true }"
    ></v-textarea>
    <v-btn class="check-btn"
      color="teal lighten-1"
      elevation="3"
      x-large
      v-on:click="returnEnteredText"
      :class="{ hideInput: isMobile === true }"
    >
      <span style="color: white;">Проверить</span>
    </v-btn>
    <v-btn class="check-btn new-search-btn"
      color="teal lighten-1"
      elevation="3"
      x-large
      v-on:click="BackReturnEnteredTextBlock"
      :class="{ mobileBtn: isMobile === true }"
    >
      <span style="color: white;">Новый запрос</span>
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
      isMobile: "",
    }
  },
  methods:{
    returnEnteredText:function (){
      this.$emit('changeEnteredText', this.enteredText )
      if( screen.width <= 600 ) {
          return this.isMobile = true;
      }
      else {
          return this.isMobile = false;
      }
    },
    BackReturnEnteredTextBlock: function() {
      return this.isMobile = false;
    }
  },
}
</script>

<style scoped>
  .hideInput {
    display: none;
  }
  .mobileBtn {
    width: 100%;
    display: block !important;
  }
  .new-search-btn {
    display: none;
  }
</style>