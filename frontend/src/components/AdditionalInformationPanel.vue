<template>
  <div class="result-block">
    <DiagramComp
      :items="filterFound"
      :notFound="filterNotFound.length"
      v-show="isShow"
    />
  </div>
</template>

<script>
import DiagramComp from "@/components/DiagramComp";

export default {
  props: ["filterNotFound", "filterFound", "items"],
  name: "AdditionalInformationPanel",
  components: {
    DiagramComp,
  },

  computed: {
    isShow() {
      return this.filterFound.length !== 0;
    },
  },
};
</script>

<style scoped>
.result-block {
  margin-top: 100px;
}
</style>
