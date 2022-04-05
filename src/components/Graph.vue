<template>
  <div>
    <ScatterChart class="graph" v-if="type==='ta'" :chartData="dataAge" :options="optionsAge"/>
    <ScatterChart class="graph" v-else-if="type==='td'" :chartData="dataDate" :options="optionsDate"/>
  </div>
</template>

<script>
import {ScatterChart} from 'vue-chart-3';
import 'chartjs-adapter-date-fns';

import {Chart, registerables} from "chart.js";
import ParseDate from "date-fns/parse";
import {fr} from "date-fns/locale";

Chart.register(...registerables);

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Graph',
  components: {ScatterChart},
  props: ["type", "donnees", "children"],
  computed: {
    dataAge: function () {
      if (this.donnees == null)
        return null

      let datasets = {datasets: []};

      for (let nom in this.children) {
        const child = this.children[nom];

        let data = [];

        if (this.donnees[nom]) {
          const donnee = this.donnees[nom];

          for (let i = 0; i < donnee.length; i++) {

            const dob = this.strToDate(child.date)
            const mesure = this.strToDate(donnee[i].date)

            const num = (mesure.getTime() - dob.getTime()) / 1000 / 60 / 60 / 24 / 365;
            const x = Number((Math.abs(num) * 10).toPrecision(15));

            data.push({x: Math.round(x) / 10 * Math.sign(num), y: donnee[i].value})
          }
        }
        datasets.datasets.push({
          showLine: true,
          label: nom,
          data: data,
          backgroundColor: child.color,
          borderColor: child.color,
          pointRadius: 8,
          pointHoverRadius: 9,
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
        if (this.donnees[nom]) {
          const donnee = this.donnees[nom];

          for (let i = 0; i < donnee.length; i++) {
            const mesure = this.strToDate(donnee[i].date)

            data.push({x: mesure, y: donnee[i].value})
          }
        }

        datasets.datasets.push({
          showLine: true,
          label: nom,
          data: data,
          backgroundColor: child.color,
          borderColor: child.color,
          pointRadius: 8,
          pointHoverRadius: 9,
        });
      }
      return datasets
    },
    optionsAge: function () {
      return {
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                size: 16
              },
              boxWidth: 50,
              boxHeight: 20,
              sort: (a, b) => {
                if (!this.children[a.text] || !this.children[b.text])
                  return 0
                const date1 = this.strToDate(this.children[a.text].date);
                const date2 = this.strToDate(this.children[b.text].date);

                if (date1 < date2)
                  return 1
                else
                  return -1
              }
            }
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
              },
              footer: (context) => {
                const data = context[0].dataset.data;
                for (let i = 0; i < data.length; i++) {
                  if (data[i] === context[0].raw) {
                    const date = this.strToDate(this.donnees[context[0].dataset.label][i].date);

                    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
                    const day = date.getDate();
                    const month = months[date.getMonth()];
                    const year = date.getFullYear();

                    return day + " " + month + " " + year
                  }
                }
                return "Error"
              }
            },
            titleAlign: 'center',
            titleFont: {
              size: 16
            },
            bodyFont: {
              size: 15
            },
            footerAlign: 'center',
            footerFont: {
              weight: 'normal',
              family: "'system-ui', serif",
              size: 15
            }
          }
        },
        onClick: (e, a) => {
          if (a.length !== 0) {
            const point = a[0];
            const child = Object.keys(this.children)[point.datasetIndex];
            const values = this.donnees[child][point.index];
            this.$emit("pointClicked", {child: child, date: values.date, value: values.value, pos: point.index})
          }
        }
      }
    },
    optionsDate: function () {
      return {
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                size: 16
              },
              boxWidth: 50,
              boxHeight: 20,
              sort: (a, b) => {
                const date1 = this.strToDate(this.children[a.text].date);
                const date2 = this.strToDate(this.children[b.text].date);

                if (date1 < date2)
                  return 1
                else
                  return -1
              }
            }
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
                const date = new Date(context.raw.x);

                const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
                const day = date.getDate();
                const month = months[date.getMonth()];
                const year = date.getFullYear();

                return day + " " + month + " " + year + " - " + context.raw.y + "cm";
              }
            },
            titleAlign: 'center',
            titleFont: {
              size: 16
            },
            bodyFont: {
              size: 15
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
        },
        onClick: (e, a) => {
          if (a.length !== 0) {
            const point = a[0];
            const child = Object.keys(this.children)[point.datasetIndex];
            const values = this.donnees[child][point.index];
            this.$emit("pointClicked", {child: child, date: values.date, value: values.value})
          }
        }
      }
    }
  },
  methods: {
    strToDate: function (str) {
      return ParseDate(str, 'dd/MM/yyyy', new Date(), {locale: fr})
    }
  }

};
</script>

<style scoped>
.graph {
  height: 95vh;
}
</style>