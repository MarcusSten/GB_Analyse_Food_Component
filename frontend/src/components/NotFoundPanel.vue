<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header
        color="error"
        class="white--text not-found-title">
        Не найдено
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list two-line>
      <v-list-item-group>
        <template v-for="(item, index) in items">
          <v-list-item :key="index + 'notFound'" v-if="item.description === 'Not Found'" class="item-title">
            <template>
              <v-list-item-content>
                <v-list-item-title class="text-left" v-text="nameFormat(item.name)"></v-list-item-title>
              </v-list-item-content>
              <v-tooltip bottom color="white">
                <template v-slot:activator="{ on, attrs }">
                        <span
                            v-bind="attrs"
                            v-on="on"
                        >
                          <a v-bind:href="`https://yandex.ru/search/?text=` + item.name"
                             target="_blank"
                             class="link-not-found"
                             icon
                          >
                            <v-icon color="grey lighten-1">
                              mdi-open-in-new
                            </v-icon>
                          </a>
                        </span>
                </template>
                <span class="item-tooltip">Поиск в интернете информации о добавке - {{item.name}}</span>
              </v-tooltip>
              
            </template>
          </v-list-item>
          <v-divider
              v-if="index < items.length - 1"
              :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>

export default {
  
  props:['notFound', 'items'],
  name: "NotFoundPanel",
  data(){
    return{
    }
  },
  methods:{
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
  }
}
</script>

<style scoped>
  .not-found-title {
    border-radius: 4px;
    font-weight: 500;
    letter-spacing: 0.0892857143em;
    outline: 0;
    text-indent: 0.0892857143em;
    text-transform: uppercase;
    transition-duration: 0.28s;
    transition-property: box-shadow, transform, opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
</style>