<template>
  <div id="graphContainer" v-if="this.data != null">
    <Scatter class="graph" v-if="type==='ta'" :chart-data="dataAge" :chart-options="optionsAge"/>
    <Scatter class="graph" v-else-if="type==='td'" :chart-data="dataDate" :chart-options="optionsDate"/>
  </div>
</template>

<script>
import {Scatter} from 'vue-chartjs';
import 'chartjs-adapter-date-fns';

import {Chart, registerables} from "chart.js";
import ParseDate from "date-fns/parse";
import {fr} from "date-fns/locale";

Chart.register(...registerables);

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Graph',
  components: {Scatter},
  props: ["type"],
  data: function () {
    return {
      children: this.$store.getters.children,
      data: this.$store.getters.data
    }
  },
  computed: {
    dataAge: function () {

      let datasets = {datasets: []};

      for (let nom in this.children) {
        const child = this.children[nom];

        let data = [];

        const donnee = this.data[nom];

        if (donnee) {
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
      let datasets = {datasets: []};

      for (let nom in this.children) {
        const child = this.children[nom];

        let data = [];
        const donnee = this.data[nom];

        if (donnee) {
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
                const date1 = this.strToDate(this.children[a.text].date);
                const date2 = this.strToDate(this.children[b.text].date);

                if (date1 < date2)
                  return 1
                else
                  return -1
              }
            },
            onHover: (e) => {
              e.native.target.style.cursor = "pointer"
            },
            onLeave: (e) => {
              e.native.target.style.cursor = "default"
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
                    const date = this.strToDate(this.data[context[0].dataset.label][i].date);

                    return this.dateToStr(date)
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
            const values = this.data[child][point.index];
            this.$emit("pointClicked", {child: child, date: values.date, value: values.value, pos: point.index})
          }
        },
        maintainAspectRatio: false
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
            },
            onHover: (e) => {
              e.native.target.style.cursor = "pointer"
            },
            onLeave: (e) => {
              e.native.target.style.cursor = "default"
            }
          },
          tooltip: {
            callbacks: {
              title: function (context) {
                return context[0].dataset.label;
              },
              label: (context) => {
                const date = new Date(context.raw.x);
                return this.dateToStr(date) + " - " + context.raw.y + "cm";
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
            const values = this.data[child][point.index];
            this.$emit("pointClicked", {child: child, date: values.date, value: values.value})
          }
        },
        maintainAspectRatio: false
      }
    }
  },
  methods: {
    strToDate: function (str) {
      return ParseDate(str, 'dd/MM/yyyy', new Date(), {locale: fr})
    },
    dateToStr: function (date) {
      const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();

      return day + " " + month + " " + year
    }
  }
};
</script>

<style scoped>
.graph {
  height: 40rem !important;
  width: 85rem !important;
  padding: 5px;
  background-color: var(--fluorescent-blue);
  border: var(--maximum-blue) 5px solid;
  border-radius: 10px;
}
</style>