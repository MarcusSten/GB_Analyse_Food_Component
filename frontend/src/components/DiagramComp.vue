<template>
  <div>
    <DiagramChart :data="points"></DiagramChart>
  </div>
</template>

<script>
import DiagramChart from "./DiagramChart";

export default {
  name: "DiagramComp",
  
  components: {
    DiagramChart,
  },

  data() {
    return {
      intervalId: null,
      points: [],
    }
  },

  methods: {
    updateDiagram() {
      console.log("Update");
    },
  },

  mounted() {
    this.$root.$on("updateDiagram", () => {
      this.updateDiagram();
    });
  },
};
</script>
