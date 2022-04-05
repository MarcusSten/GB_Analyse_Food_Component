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
        <v-app-bar-title class=" align-center pl-6 d-none d-sm-flex d-sm-none">
          <h2>Analyse <span class="red--text">Food</span> Components</h2>
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn 
          class="d-flex align-self-center"
          color="error"
          to="/about"
          >
          О Проекте
        </v-btn>
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
                <v-expansion-panel-header v-if="item.description !== 'Not Found'" class="item-title">
                  {{item.name}}
                  <v-tooltip bottom color="white">
                    <template v-slot:activator="{ on, attrs }">
                      <span
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-rating v-model="item.harmNum">
                          <template v-slot:item="props">
                            <v-icon
                              :color="props.isFilled ? genColor(props.index) : 'grey lighten-1'"
                              medium
                            >
                              {{ props.isFilled ? 'mdi-cards-heart' : 'mdi-cards-heart-outline' }}
                            </v-icon>
                          </template>
                        </v-rating>
                      </span>
                    </template>
                    <span class="item-title">Вред добавки - {{item.name}}</span>
                  </v-tooltip>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <output-form :card-data="item" :key="index" class=""></output-form>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col cols="30" sm="6">
          </v-col>
          <v-col>
        <v-card v-if="notFound.length !== 0"
        >
          <v-toolbar
            color="error"
            dark
          >
            <v-toolbar-title>Не найдено</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-list two-line>
            <v-list-item-group
              active-class="pink--text"
         
            >
              <template v-for="(item, index) in items">
                <v-list-item :key="item.name" v-if="item.description === 'Not Found'" class="item-title">
                  <template>
                    <v-list-item-content>
                      <v-list-item-title class="text-left" v-text="item.name"></v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-list-item>
                <v-divider
                  v-if="index < items.length - 1"
                  :key="index"
                ></v-divider>
              </template>
            </v-list-item-group>
          </v-list>
        </v-card>
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
      colors: ['light-green accent-3', 'lime accent-2', 'orange', 'orange darken-4', 'deep-orange darken-4'],
      notFound: [],
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
      this.notFound = [];
      this.separatedList = this.enteredText.split(",").map((el) => el.trim())
      this.separatedList.map(async (element) => {
        await this.get_description(element);
        this.items.push(this.result)
      })

      // this.get_description(this.separatedList[0])
      // console.log(typeof this.result)
      // console.log(this.result)

    },
    genColor (i) {
      return this.colors[i]
    },

    async get_description(additiveName) {
      let response = await fetch("http://localhost:3001/names/" + additiveName);
      if (response.ok) {
        let json = await response.json();
        this.result = json
      } else {
        this.result = {"name": additiveName, "description": "Not Found"}
        this.notFound.push(this.result)
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

  .item-title {
    font-weight: bold;
    color: black;
  }
</style>