<template>
  <div class="result-block">
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
</style>