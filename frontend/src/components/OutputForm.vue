<template>
    <div class="items-wrapper">
      <div class="item-block">
        <v-tooltip bottom color="white">
          <template v-slot:activator="{ on, attrs }">
            <span
              v-bind="attrs"
              v-on="on"
            ><span class="item-title">ОПИСАНИЕ: </span></span>
          </template>
          <span class="item-title">Описание добавки - {{cardData.name}}</span>
        </v-tooltip>
        {{ cardData.description }}
      </div>
      <v-spacer></v-spacer>
      <div class="item-block">
        <v-tooltip bottom color="white">
          <template v-slot:activator="{ on, attrs }">
            <span
              v-bind="attrs"
              v-on="on"
            ><span class="item-title">КАТЕГОРИЯ: </span></span>
          </template>
          <span class="item-title">Категория в классификации пищевых добавок</span>
        </v-tooltip>
        {{ cardData.category }}
      </div>
      <v-spacer></v-spacer>
      <div class="item-block">
        <v-tooltip bottom color="white">
          <template v-slot:activator="{ on, attrs }">
            <span
              v-bind="attrs"
              v-on="on"
            ><span class="item-title">ПРОИСХОЖДЕНИЕ: </span></span>
          </template>
          <span class="item-title">Исскуственная или натуральная добавка - {{cardData.name}}</span>
        </v-tooltip>
        {{ cardData.origin }}
      </div>
      <v-spacer></v-spacer>
      <div class="item-block">
        <v-tooltip bottom color="white">
          <template v-slot:activator="{ on, attrs }">
            <span
              v-bind="attrs"
              v-on="on"
            ><span class="item-title">ВРЕД: </span></span>
          </template>
          <span class="item-title">Насколько вредна добавка - {{cardData.name}}</span>
        </v-tooltip>
        {{ cardData.harm }}
      </div>
      <v-spacer></v-spacer>
      <div class="item-block">
        <v-tooltip bottom color="white">
          <template v-slot:activator="{ on, attrs }">
            <span
              v-bind="attrs"
              v-on="on"
            ><span class="item-title">ПОЛЬЗА: </span></span>
          </template>
          <span class="item-title">Полезность добавки - {{cardData.name}}</span>
        </v-tooltip>
        {{ cardData.benefit }}
      </div>
      <v-spacer></v-spacer>
      <div class="item-block">
        <v-tooltip bottom color="white">
          <template v-slot:activator="{ on, attrs }">
            <a v-bind:href="cardData.link"
              class="link"
              icon
              v-bind="attrs"
              v-on="on"
              >
              <v-icon color="grey lighten-1">
                mdi-open-in-new
              </v-icon>
            </a>
          </template>
          <span class="item-title">Ссылка на Wiki с информацией о добавке - {{cardData.name}}</span>
        </v-tooltip>
        <div>
          <ContactForm/>
        </div>
      </div>
    </div>
</template>

<script>
import ContactForm from "@/components/ContactForm";
export default {
  name: "OutputForm",
  components: {ContactForm},
  props: ["cardData"],
  data(){
    return{
      reveal: false,
    }
  }
}
</script>

<style scoped>
  .items-wrapper {
    text-align: left;
    margin-top: 10px;
  }

  .item-block {
    margin-top: 10px;
  }

  .item-title {
    font-weight: bold;
    color: black;
    margin-top: 10px;
    cursor: default;
  }

  .link {
    text-decoration:none;
  }
</style>