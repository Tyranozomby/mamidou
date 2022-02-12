<template>
  <div>
    <ScatterChart v-if="type==='ta'" :chartData="dataAge" :options="options"/>
    <ScatterChart v-else-if="type==='td'" :chartData="dataDate" :options="options"/>
  </div>
</template>

<script>
import {ScatterChart} from 'vue-chart-3';
import 'chartjs-adapter-date-fns';

import {Chart, registerables} from "chart.js";

Chart.register(...registerables);

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Graph',
  components: {ScatterChart},
  props: ["type"],
  computed: {
    dataAge: function () {
      return {
        // labels: [4,12],
        datasets: [
          {
            showLine: true,
            label: "petite salope",
            data: [{x: 14.5, y: 152}, {x: 15.4, y: 168}, {x: 18.3, y: 180}],
            backgroundColor: '#77CEFF',
            borderColor: '#ab0ad0'
          },
          {
            showLine: true,
            label: "moyenne salope",
            data: [{x: 12.5, y: 132}, {x: 13.9, y: 141}, {x: 15.6, y: 158}],
            backgroundColor: '#b71265',
            borderColor: '#82e341'
          }
        ],
      }
    },
    dataDate: function () {
      return {
        // labels: [4,12],
        datasets: [
          {
            showLine: true,
            label: "petite salope",
            data: [{x: 14.2, y: 152}, {x: 15.8, y: 168}, {x: 18.7, y: 180}],
            backgroundColor: '#11303f',
            borderColor: '#d9bce0'
          },
          {
            showLine: true,
            label: "moyenne salope",
            data: [{x: 12.3, y: 132}, {x: 13.9, y: 141}, {x: 15.6, y: 158}],
            backgroundColor: '#079fe1',
            borderColor: '#c509a0'
          }
        ],
      }
    },
    options: function () {
      return {
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Graphique ' + ((this.type === "ta") ? "Taille par Age" : "Taille par Date"),
            font: {
              size: "22px"
            }
          }
        },
      }
    }
  }
};
</script>

<style scoped>

</style>