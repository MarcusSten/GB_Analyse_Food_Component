<template>
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
              <ContactForm/>
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
</template>

<script>
import ContactForm from "@/components/ContactForm";
export default {
  components: {ContactForm},
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

</style>