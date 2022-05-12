<template>
  <highcharts :options="chartOptions" :updateArgs="updateArgs"></highcharts>
</template>

<script>
export default {
  props: ["data", "title"],

  data() {
    return {
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
          text: "",
        },
        series: [
          {
            data: [],
          },
        ],
      },
      updateArgs: [true, true, { duration: 1000 }],
      types: [],
    };
  },

  watch: {
    data() {
      this.chartOptions.series[0].data = this.data;
    },
  },
};
</script>
