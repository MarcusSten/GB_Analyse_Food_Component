<template>
  <div>
    <h2>Информация о составе продукта:</h2>
    <div class="diagramBody">
      <DiagramChart class="chart" :data="pointsIsFound"></DiagramChart>
      <DiagramChart class="chart" :data="points"></DiagramChart>
    </div>
  </div>
</template>

<script>
import DiagramChart from "./DiagramChart";

export default {
  name: "DiagramComp",

  data() {
    return {
      intervalId: null,
      pointsIsFound: [],
      points: [],
    }
  },
  
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
      })
      
      for (let i = 1; i <= 5; i++) {
        result.push({name: `Индекс ${i}`, y: data[`n${i}`]})
      }

      this.pointsIsFound = [
        {
          name: "Не найдено",
          y: obj.notFound,
          color: "#FF6666"
        },
        {
          name: "Найдено",
          y: this.items.length,
          color: "#77DD77"
        }
      ]

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

<style lang="scss">
.diagramBody {
  display: flex;
}

.chart {
  width: 450px;
  height: 450px;
}
</style>