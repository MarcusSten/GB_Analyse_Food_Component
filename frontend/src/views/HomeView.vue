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
                v-model="enteredText"
            ></v-textarea>
            <v-btn class="check-btn"
                   color="error"
                   elevation="3"
                   x-large
                   v-on:click="check"

            >Проверить
            </v-btn>
          </v-col>
          <v-col>
            <v-expansion-panels focusable>
              <v-expansion-panel
                v-for="(item, index) in items" :key="index"
              >
                <v-expansion-panel-header>{{item.name}}</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <output-form :card-data="item" :key="index" class=""></output-form>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
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
import OutputForm from "@/components/OutputForm";

export default {
  name: 'HomeView',
  data() {
    return {
      enteredText: "",
      separatedList: [],
      items: [],
      result: {},
      active: false,
    }
  },
  components: {
    OutputForm
    // HelloWorld
  },
  methods: {
    check() {
      this.items = [];
      this.result = {};
      this.separatedList = this.enteredText.split(",").map((el) => el.trim())
      this.separatedList.map(async (element) => {
        await this.get_description(element);
        this.items.push(this.result)
      })

      // this.get_description(this.separatedList[0])
      // console.log(typeof this.result)
      // console.log(this.result)

    },

    async get_description(additiveName) {
      let response = await fetch("http://localhost:3001/names/" + additiveName);
      if (response.ok) {
        let json = await response.json();
        this.result = json
      } else {
        this.result = {"name": additiveName, "description": "Not Found"}
      }
    }
  }
}
</script>
<style>
.text {
  color: black;
  text-align: left;
  margin-bottom: 10px;
}

.check-btn {
  float: right
}
</style>