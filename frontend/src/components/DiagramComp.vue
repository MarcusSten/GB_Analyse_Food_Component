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

  props: ['items', "notFound"],

  watch: {
    items: function (newVal) {
      const res = {
        items: newVal,
        notFound: this.notFound
      }

      this.updateDiagram(res);
    },

    notFound: function(newVal) {
      const res = {
        items: this.items,
        notFound: newVal,
      }

      this.updateDiagram(res)
    }
  },

  data() {
    return {
      intervalId: null,
      points: [],
    }
  },

  methods: {
    updateDiagram(obj) {
      let result = [];

      const data = {
        "n5": 0,
        "n4": 0,
        "n3": 0,
        "n2": 0,
        "n1": 0,
      }

      obj.items.map((elem) => {
        data[`n${elem.harmNum}`] += 1;
        // result.push({name: elem.name, y: elem.harmNum});
      })
      for (let i = 1; i <= 5; i++) {
        result.push({name: `Индекс ${i}`, y: data[`n${i}`]})
      }
      
      result.push({name: "Не найдено", y: obj.notFound, color: "#FF6666"})

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
