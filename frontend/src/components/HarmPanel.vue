<template>
<div v-if="isFound.length">
  <div class="v-expansion-panel-header white--text not-found-title teal lighten-1 result-item">
    <div>
      <v-badge
          color="green"
          :content="isFound.length"
      >
        НАЙДЕНО КОМПОНЕНТОВ
      </v-badge>
    </div>
  </div>
  <v-expansion-panels focusable>
    <v-expansion-panel
        v-for="(item, index) in isFound" :key="index"
    >
      <v-expansion-panel-header v-if="item.description !== 'Not Found'" class="item-title">
        {{ nameFormat(item.name, item.searchName) }}

<!--        старый вариант работы tooltip -->
<!--        <v-rating v-model="item.harmNum" class="rating">-->
<!--          <template v-slot:item="props">-->
<!--            <v-icon-->
<!--                :color="props.isFilled ? genColor(props.index) : 'grey lighten-1'"-->
<!--                medium-->
<!--            >-->
<!--              {{ props.isFilled ? 'mdi-cards-heart' : 'mdi-cards-heart-outline' }}-->
<!--            </v-icon>-->
<!--          </template>-->
<!--        </v-rating>-->

        <v-rating v-model="item.harmNum" class="rating">
          <template v-slot:item="props">
            <v-tooltip bottom color="white">
              <template v-slot:activator="{ on, attrs }">
                <span
                    v-bind="attrs"
                    v-on="on"
                >
                  <v-icon
                      :color="props.isFilled ? genColor(props.index) : 'grey lighten-1'"
                      medium
                  >
                    {{ props.isFilled ? 'mdi-cards-heart' : 'mdi-cards-heart-outline' }}
                  </v-icon>
                </span>
              </template>
              <span class="item-title">Вред добавки - {{item.name}}</span>
            </v-tooltip>
          </template>
        </v-rating>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <OutputForm
            :card-data="item"
            :key="index"
        />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</div>
</template>

<script>
import OutputForm from "@/components/OutputForm";

export default {
  name: "HarmPanel",
  data(){
    return{
      colors: ['light-green accent-3', 'lime accent-2', 'orange', 'orange darken-4', 'deep-orange darken-4'],
    }
  },
  props: ['isFound'],
  components:{OutputForm},
  methods:{
    genColor (i) {
      return this.colors[i]
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
  }
}
</script>

<style scoped>

.item-title {
  font-weight: bold;
  color: black;
}
.rating {
  text-align: end;
  margin-right: 30px;
}

.result-item {
  margin: 0 auto;
  color: white;
  background-color: #26A69A !important;
  border-color: #26A69A !important;
  box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%) !important;
  border-radius: 4px;
  font-weight: 500;
  letter-spacing: 0.0892857143em;
  text-transform: uppercase;
}


</style>