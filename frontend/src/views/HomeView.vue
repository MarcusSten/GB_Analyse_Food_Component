/* eslint-disable */
<template>
  <v-app>
    <v-app-bar min-height="80" app>
      <v-col class="d-flex">
        <v-app-bar-nav-icon>
          <v-img
             class="mt-6"
              alt="food"
              max-width="65"
              src="../assets/food (2).svg"></v-img>
        </v-app-bar-nav-icon>
        <v-app-bar-title class=" align-center pl-6 d-none d-sm-flex d-sm-none mt-3">
          <h2>Analyse <span style="color: #26A69A;">Food</span> Components</h2>
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <div class="contactForm">
          <ContactForm/>
        </div>
        <v-btn
          class="d-flex align-self-center mt-4"
          color="teal lighten-1"
          to="/about"
          >
          <span style="color: white;">О Проекте</span>
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
            <AdditionalInformationPanel
                  v-bind:filter-not-found = "filterNotFound"
                  v-bind:filter-found = "filterFound"
                  v-bind:items = "items"
              />
          </v-col>
          <v-col>
              <HarmPanel
                  v-bind:is-found = "filterFound"
                />
              <NotFoundPanel
                v-if="notFound.length !== 0"
                v-bind:not-found = "filterNotFound"
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
// import OutputForm from "@/components/OutputForm";
// import DiagramComp from "@/components/DiagramComp";
import InputForm from "@/components/InputForm";
import NotFoundPanel from "@/components/NotFoundPanel";
import ContactForm from "@/components/ContactForm";
import AdditionalInformationPanel from "@/components/AdditionalInformationPanel";
import HarmPanel from "@/components/HarmPanel";

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
    HarmPanel,
    AdditionalInformationPanel,
    NotFoundPanel,
    // OutputForm,
    // DiagramComp,
    InputForm,
    ContactForm,
  },
  computed: {
    filterFound(){
      return this.withOutDuplicates(this.isFound)
    },

    filterNotFound() {
      return this.withOutDuplicates(this.notFound)
    },
  },
  methods: {
    check(updatedText) {
      this.enteredText = updatedText;
      this.items = [];
      this.result = {};
      this.isFound = [];
      this.notFound = [];
      const regExp = /[,()—.;:*-]/;
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
      let badphrases = ['эмульгатор – ', 'регуляторы кислотности – ', 'краситель – ', 'стабилизатор – ', 'регулятор кислотности ', 'эмульгаторы ', 'разрыхлитель ', 'регуляторы кислотности ', 'эмульгатор ', 'антиокислители: ', 'краситель '];

      if (additiveName && additiveName.length){

        for (let i = 0; i <= badphrases.length; i++) {
          if(additiveName.includes(badphrases[i]) === true) {
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
          if (phrase.length > 1) {
            this.result = {"name": phrase, "description": "Not Found"}
            this.notFound.push(this.result)
          }
        }
      }
    }
  }
}


</script>
<style>
  .contactForm{
    padding-top: 30px;
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
</style>