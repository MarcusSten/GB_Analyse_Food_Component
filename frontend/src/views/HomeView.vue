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
        <div class="contactForm">
          <ContactForm/>
        </div>
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
            <div class="result-block">
              <div class="result-information">
                <div v-show="items.length !== 0" class="result-item">
                  <v-badge
                    color="green"
                    :content="filterFound.length"
                  >
                    Найдено компонентов
                  </v-badge>
                </div>
                <div v-show="items.length !== 0" class="result-item">
                  <v-badge
                    color="green"
                    :content="filterNotFound.length"
                  >
                    Неизвестные компоненты:
                  </v-badge>
                </div>
              </div>
            
              <DiagramComp
                :items="items"
                v-show="items.length !== 0"
                />
            </div>
          </v-col>
          <v-col>
            <v-expansion-panels focusable>
              <v-expansion-panel
                v-for="(item, index) in filterFound" :key="index"
              >
                <v-expansion-panel-header
                    v-if="item.description !== 'Not Found' && nameFormat(item.name, item.searchName)" class="item-title">
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
                  <output-form :card-data="item" :key="index"></output-form>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>

            <div class="not-found-block">
              <NotFoundPanel
                v-if="notFound.length !== 0"
                v-bind:not-found = "filterNotFound"
                v-bind:items = "items"
              />
            </div>
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
    ContactForm,
  },
  computed: {
    filterFound(){
      return this.withOutDuplicates(this.isFound)
    },

    filterNotFound() {
      return this.withOutDuplicates(this.items)
    },
  },
  methods: {
    check(updatedText) {
      this.enteredText = updatedText;
      this.items = [];
      this.result = {};
      this.isFound = [];
      this.notFound = [];
      const regExp = /[,()—.]/;
      this.separatedList = this.enteredText.split(regExp).map((el) => el.trim())

      this.separatedList.map(async (element) => {
        await this.get_description(element);
        this.items.push(this.result)
      })
    },

    genColor (i) {
      return this.colors[i]
    },

    withOutDuplicates(arr){
      return arr.reduce((o, i) => {
        if (!o.find(v => v.name === i.name)) {
          o.push(i);
        }
        return o;
      }, [])
    },

    searchFormat(string){
      let res = ''

      if(string[0].toUpperCase() === 'Е') {
        res = 'E' + string.slice(1)
      } else {
        res = string
      }

      return res.replace(/[ -()]/g, "")
    },

    nameFormat(name, searchName){
      let str = ''

      if(searchName){

        if(this.searchFormat(searchName).toUpperCase() === name.toUpperCase()) {
          str = searchName.toString()
        } else {
          str = `${ searchName + ' (' + name + ')'}`
        }

      } else if (name && name.length > 2) {
        str = name
      } else {
        str = ''
      }

      return str;
    },

    async get_description(additiveName) {
      
      let phrase = '';
      let badphrases = ['регулятор кислотности ', 'эмульгаторы '];

      if (additiveName && additiveName.length){

        for (let i = 0; i <= badphrases.length; i++) {
          if(additiveName.includes(badphrases[i]) == true) {
            phrase = additiveName.replace(badphrases[i], '');
            break;
          } else {
            phrase = additiveName;
          }
        }

        try {
          let response = await fetch("http://localhost:3001/names/" + phrase.replace(/[.,-/#!$%^&*;:{}=\-_`~()@+?><[\]]/g, ''));
          this.result = await response.json()
            this.isFound.push({
              searchName: phrase[0].toUpperCase() + phrase.slice(1),
              ...this.result
            })
        } catch (e){
          this.result = {"name": phrase, "description": "Not Found"}
          this.notFound.push(this.result)
        }
      }
    }
  }
}


</script>
<style>
  .contactForm{
    padding-top: 18px;
    margin-right: 25px;
  }
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

  .text-left {
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

  .result-block {
    margin-top: 100px;
  }

  .not-found-block {
    margin-top: 30px;
  }

  .result-information {
    display: flex;
    justify-content: space-around;
  }

  .result-item {
    margin: 0 auto;
    width: 270px;
    padding: 8px 0;
    text-align: center;
    color: white;
    background-color: #ff5252 !important;
    border-color: #ff5252 !important;
    box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%) !important;
    border-radius: 4px;
    font-weight: 500;
    letter-spacing: 0.0892857143em;
    text-transform: uppercase;
    margin-bottom: 30px;
    font-size: 12px;
  }


</style>