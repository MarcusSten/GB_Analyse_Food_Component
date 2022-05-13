<template>
  <div>
    <h2>Информация о составе продукта:</h2>
    <div class="overall-result d-flex align-center justify-center">
      <v-card
        class="overall-result-block d-flex justify-center align-center"
        color="teal lighten-1"
      >
        <v-icon
          :color="
            overAllResultNum ? genColor(overAllResultNum) : 'grey lighten-1'
          "
          x-large
        >
          mdi-cards-heart
        </v-icon>
        <span class="num-all-hurm-result">{{ overAllResultNum }}</span>
      </v-card>
      <h3 class="ml-3">
        Общий показатель состава продукта -
        <span :class="[colorsStyle[overAllResultNum - 1]]">{{
          overAllResultTexts[overAllResultNum - 1]
        }}</span>
      </h3>
    </div>

    <div class="diagramBody">
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
      overAllResultNum: 0,
      overAllResultTexts: [
        "безвредный",
        "почти безвредный",
        "вредный",
        "очень вредный",
        "яд",
      ],
      colors: ["#76ff03", "#eeff41", "#f99800", "#e65100", "#bd360c"],
      colorsStyle: ["light-green", "lime", "orange", "orange", "deep-orange"],
    };
  },

  components: {
    DiagramChart,
  },

  props: ["items", "notFound"],

  watch: {
    items: function (newVal) {
      const res = {
        items: newVal,
        notFound: this.notFound,
      };

      this.updateDiagram(res);
    },

    notFound: function (newVal) {
      const res = {
        items: this.items,
        notFound: newVal,
      };

      this.updateDiagram(res);
    },
  },

  methods: {
    updateDiagram(obj) {
      let result = [];

      const data = {
        n5: 0,
        n4: 0,
        n3: 0,
        n2: 0,
        n1: 0,
      };

      obj.items.map((elem) => {
        data[`n${elem.harmNum}`] += 1;
      });

      for (let i = 1; i <= 5; i++) {
        result.push({
          name: this.overAllResultTexts[5 - i],
          y: data[`n${i}`],
          color: this.colors[5 - i],
        });
      }

      this.points = result;
      this.overAllResult();
    },

    genColor(i) {
      return this.colors[i - 1];
    },

    overAllResult() {
      let sumHarmNum =
        1 * this.points[0].y +
        2 * this.points[1].y +
        3 * this.points[2].y +
        4 * this.points[3].y +
        5 * this.points[4].y;
      let sumComponents =
        this.points[0].y +
        this.points[1].y +
        this.points[2].y +
        this.points[3].y +
        this.points[4].y;
      this.overAllResultNum = Math.round(sumHarmNum / sumComponents);
      if (isNaN(this.overAllResultNum)) {
        return (this.overAllResultNum = 0);
      }
      return this.overAllResultNum;
    },
  },

  mounted() {
    this.$root.$on("updateDiagram", (items) => {
      this.updateDiagram(items);
    });
  },
};
</script>

<style lang="scss" scoped>
.diagramBody {
  display: flex;
  justify-content: center;
}

.chart {
  width: 600px;
}

.overall-result {
  margin: 20px 50px;
}

.overall-result-block {
  height: 70px;
  width: 70px;
  background-color: aqua;
}

.v-icon.v-icon {
  font-size: 55px !important;
}

.num-all-hurm-result {
  position: absolute;
  color: #2c3e50;
  font-weight: bold;
}

.light-green {
  color: #76ff03 !important;
  background-color: white !important;
}
.lime {
  color: #fff941 !important;
  background-color: white !important;
}
.orange {
  color: #ff9800 !important;
  background-color: white !important;
}
.orange {
  color: #e65100 !important;
  background-color: white !important;
}
.deep-orange {
  color: #bf360c !important;
  background-color: white !important;
}
</style>
