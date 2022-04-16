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

  props: ['items'],

  watch: {
    items: function (newVal) {
      this.updateDiagram(newVal);
      console.log(newVal)
    }
  },

  data() {
    return {
      intervalId: null,
      points: [],
    }
  },

  methods: {
    updateDiagram(items) {
      console.log("Update");

      let result = [];
      
      items.map((elem) => {
        result.push({name: elem.name, y: elem.harmNum})
      })

      this.points = result;
    },
  },

  mounted() {
    this.$root.$on("updateDiagram", (items) => {
      this.updateDiagram(items);
    });
  },
};
</script>
