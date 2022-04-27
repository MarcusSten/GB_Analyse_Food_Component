<template>
  <div class="result-block">
    <div class="result-information">
      <div v-show="filterFound.length !== 0" class="result-item">
        <v-badge
            color="green"
            :content="filterFound.length"
        >
          Найдено компонентов
        </v-badge>
      </div>
      <div v-show="filterNotFound.length !== 0" class="result-item">
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
</template>

<script>
import DiagramComp from "@/components/DiagramComp";

export default {
  props: ['filterNotFound', 'filterFound', 'items'],
  name: "AdditionalInformationPanel",
  components:{
    DiagramComp
  }
}
</script>

<style scoped>

.result-block {
  margin-top: 100px;
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
  background-color: #26A69A !important;
  border-color: #26A69A !important;
  box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%) !important;
  border-radius: 4px;
  font-weight: 500;
  letter-spacing: 0.0892857143em;
  text-transform: uppercase;
  margin-bottom: 30px;
  font-size: 12px;
}
</style>