<template>
<div>
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
</div>
</template>

<script>
import OutputForm from "@/components/OutputForm";

export default {
  name: "HarmPanel",
  props: ['isFound'],
  components:[OutputForm]
}
</script>

<style scoped>

</style>