/* eslint-disable */
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
          <ContactForm/>
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

              <InputForm
                  title="Анализ компонентов"
                  v-on:changeEnteredText="check($event)"
              />
            <div class="diagram-block">
              <DiagramComp
                v-show="items.length !== 0"
               />
            </div>
          </v-col>
          <v-col>
            <v-expansion-panels focusable>
              <v-expansion-panel
                v-for="(item, index) in isFound" :key="index"
              >
                <v-expansion-panel-header v-if="item.description !== 'Not Found'" class="item-title">
                  {{ nameFormat(item.name, item.searchName) }}
                  <v-tooltip bottom color="white">
                    <template v-slot:activator="{ on, attrs }">
                      <span
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-rating v-model="item.harmNum" class="rating">
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
            <NotFoundPanel
              v-bind:not-found = "notFound"
              v-bind:items = "items"
            />
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
import OutputForm from "@/components/OutputForm";
import DiagramComp from "@/components/DiagramComp";
import InputForm from "@/components/InputForm";
import NotFoundPanel from "@/components/NotFoundPanel";
import ContactForm from "@/components/ContactForm";

export default {
  name: 'HomeView',
  data() {
    return {
      enteredText: "",
      separatedList: [],
      isFound: [],
      items: [],
      result: {},
      colors: ['light-green accent-3', 'lime accent-2', 'orange', 'orange darken-4', 'deep-orange darken-4'],
      notFound: [],
    }
  },
  components: {
    NotFoundPanel,
    OutputForm,
    DiagramComp,
    InputForm,
    ContactForm
  },
  methods: {
    check(updatedText) {
      this.enteredText = updatedText;
      this.items = [];
      this.result = {};
      this.isFound = [];
      this.notFound = [];
      const regExp = /,|\(|—/;

      this.separatedList = this.enteredText.split(regExp).map((el) => el.trim())

      this.separatedList.map(async (element) => {
        await this.get_description(element);
        this.items.push(this.result)
      })

      console.log(this.isFound, 'this.isFound')

      // this.get_description(this.separatedList[0])
      // console.log(typeof this.result)
      // console.log(this.result)

    },
    genColor (i) {
      return this.colors[i]
    },

    nameFormat(name, searchName){
      let str = ''

      if(searchName){

        if(searchName.toUpperCase() === name.toUpperCase()) {
          str = searchName.toString()
        } else {
          str = `${ searchName + ' (' + name + ')'}`
        }

      } else {
        str = name
      }

      return str[0].toUpperCase() + str.slice(1);
    },

    async get_description(additiveName) {
      // eslint-disable-next-line
      let response = await fetch("http://localhost:3001/names/" + additiveName.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\)\+]/g, ''));
      if (response.ok) {
        let json = await response.json();
        this.result = json
        this.isFound.push({ searchName: additiveName.replace(/\)/g, ''), ...this.result })
      } else {
        this.result = {"name": additiveName.replace(/\)/g, ''), "description": "Not Found"}
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

  .link-not-found {
    text-decoration:none;
  }

  .v-list-item__title .text-left {
    padding-right: 60px;
  }

  .item-tooltip {
    font-weight: bold;
    color: black;
    margin-top: 10px;
    cursor: default;
  }

  .rating {
    text-align: end;
    margin-right: 30px;
  }

  .diagram-block {
    margin-top: 60px;
  }
</style>