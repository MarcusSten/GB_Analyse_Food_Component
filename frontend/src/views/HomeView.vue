<template>
  <v-app>
    <v-app-bar min-height="80" app>
     <v-col class="d-flex">
      <v-app-bar-nav-icon>
        <v-img 
        alt="food"
        max-width="55"      
        src="../assets/icons8-food-64.png"></v-img>
      </v-app-bar-nav-icon>
      <v-app-bar-title class="d-flex align-center pl-6">
        <h2>Analyse <span class="red--text">Food</span> Components</h2>
      </v-app-bar-title>
      
     </v-col>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="30" sm="6">
            <div class="text"><h2>Анализ состава</h2></div>
            <v-textarea
              outlined
              auto-grow
              rows="8"
              label="Введите список ингредиентов, разделенных запятой"
            ></v-textarea>
            <v-btn class="chek-btn"
            color="error"
            elevation="3"
            x-large
            
          >Проверить</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer color="grey">
    <v-col class="font-weight-bold text-center white--text">
    2022 Brand All Rights Reserved
    </v-col>
    </v-footer>
  </v-app>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    // HelloWorld
  }
}
</script>
<style>
.text{
  color: black;
  text-align: left;
  margin-bottom: 10px;
}
.chek-btn{
  float:right
}
</style>