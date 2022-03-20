<template>
  <div>
    <ScatterChart class="graph" v-if="type==='ta'" :chartData="dataAge" :options="optionsAge"/>
    <ScatterChart class="graph" v-else-if="type==='td'" :chartData="dataDate" :options="optionsDate"/>
  </div>
</template>

<script>
import {ScatterChart} from 'vue-chart-3';
import 'chartjs-adapter-date-fns';
import axios from 'axios';

import {Chart, registerables} from "chart.js";

import ParseDate from 'date-fns/parse' // https://date-fns.org/docs/
import {fr} from 'date-fns/locale';

Chart.register(...registerables);

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Graph',
  components: {ScatterChart},
  props: ["type"],
  data: function () {
    return {
      children: null,
      donnees: null
    }
  },
  computed: {
    dataAge: function () {
      if (this.donnees == null)
        return null

      let datasets = {datasets: []};

      for (let nom in this.children) {
        const child = this.children[nom];

        let data = [];
        const donnee = this.donnees[nom];

        for (let i = 0; i < donnee.length; i++) {

          const dob = this.strToDate(child.date)
          const mesure = this.strToDate(donnee[i].date)

          const num = (mesure.getTime() - dob.getTime()) / 1000 / 60 / 60 / 24 / 365;
          const x = Number((Math.abs(num) * 10).toPrecision(15));

          data.push({x: Math.round(x) / 10 * Math.sign(num), y: donnee[i].value})
        }

        datasets.datasets.push({
          showLine: true,
          label: nom,
          data: data,
          backgroundColor: child.color,
          borderColor: child.color
        });
      }
      return datasets
    },
    dataDate: function () {
      if (this.donnees == null)
        return null

      let datasets = {datasets: []};

      for (let nom in this.children) {
        const child = this.children[nom];

        let data = [];
        const donnee = this.donnees[nom];

        for (let i = 0; i < donnee.length; i++) {
          const mesure = this.strToDate(donnee[i].date)

          data.push({x: mesure, y: donnee[i].value})
        }

        datasets.datasets.push({
          showLine: true,
          label: nom,
          data: data,
          backgroundColor: child.color,
          borderColor: child.color
        });
      }
      return datasets
    },
    optionsAge: function () {
      return {
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Graphique Taille par Age',
            font: {
              size: "22px"
            }
          },
          tooltip: {
            callbacks: {
              title: function (context) {
                return context[0].dataset.label;
              },
              label: function (context) {
                return context.raw.x + " - " + context.raw.y + "cm";
              }
            }
          }
        }
      }
    },
    optionsDate: function () {
      return {
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'Graphique Taille par Date',
            font: {
              size: "22px"
            }
          },
          tooltip: {
            callbacks: {
              title: function (context) {
                return context[0].dataset.label;
              },
              label: function (context) {
                const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
                const date = new Date(context.raw.x);

                const day = date.getDate();
                const month = months[date.getMonth()];
                const year = date.getFullYear();

                return day + " " + month + " " + year + " - " + context.raw.y + "cm";
              }
            }
          }
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: "year"
            }
          }
        }
      }
    }
  },
  methods: {
    getChildren: async function () {
      const response = await axios.get("//localhost:3000/api/children");
      this.children = response.data;
    },
    getData: async function () {
      const response = await axios.get("//localhost:3000/api/data");
      this.donnees = response.data;
    },
    strToDate: function (str) {
      return ParseDate(str, 'dd/MM/yyyy', new Date(), {locale: fr})
    }
  },
  created() {
    this.getChildren();
    this.getData();
  }
};
</script>

<style scoped>
.graph {
  height: 90vh;
}
</style>