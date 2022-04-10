<template>
  <highcharts :options="chartOptions" :updateArgs="updateArgs"></highcharts>
</template>

<script>
export default {
  props: ["data", "title"],

  data: ({
      chartOptions: {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
        },
        exporting: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        title: {
          text: "Данные о компонентах продукта",
        },
        series: [
          {
            data: [
              {
                name: "Полезные компоненты",
                y: 40,
              },
              {
                name: "Безвредные",
                y: 40,
              },
              {
                name: "Вредные",
                y: 20,
              },
            ],
          },
        ],
      },
      updateArgs: [true, true, { duration: 1000 }],
      types: [],
  }),
  
  watch: {
    data() {
      this.chartOptions.series[0].data = this.data;
    },
  },
};
</script>