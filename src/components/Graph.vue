<template>
  <div v-if="this.data != null" id="graph">
    <Scatter ref="chart" :chart-data="type==='ta' ? dataAge : dataDate"
             :chart-options="type==='ta' ? optionsAge : optionsDate"
             class="graph"/>
  </div>
</template>

<script>
import {Scatter} from 'vue-chartjs';
import 'chartjs-adapter-date-fns';

import {Chart, registerables} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom"
import ParseDate from "date-fns/parse";
import {fr} from "date-fns/locale";

Chart.register(...registerables);
Chart.register(zoomPlugin)

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Graph',
  components: {Scatter},
  props: ["type"],
  computed: {
    children() {
      return this.$store.getters.children
    },
    data() {
      return this.$store.getters.data
    },
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
          pointRadius: 6,
          pointHoverRadius: 8,
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
          pointRadius: 6,
          pointHoverRadius: 8,
        });
      }
      return datasets
    },
    optionsAge: function () {
      return {
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true
              }
            },
            pan: {
              enabled: true
            },
            limits: {
              x: {min: 0, max: 30, minRange: 5},
              y: {min: 50, max: 190, minRange: 20}
            }
          },
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
        scales: {
          y: {
            ticks: {
              callback: (value) => {
                return value.toFixed(1)
              }
            }
          }
        },
        maintainAspectRatio: false,
        transitions: {
          zoom: {
            animation: {
              duration: 0
            }
          }
        }
      }
    },
    optionsDate: function () {
      return {
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true
              }
            },
            pan: {
              enabled: true
            },
            limits: {
              x: {min: 1230764400000, max: 1893452400000}, // min: 2009, max: 2030
              y: {min: 50, max: 190, minRange: 20}
            }
          },
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
          },
          y: {
            ticks: {
              callback: (value) => {
                return value.toFixed(1)
              }
            }
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
    },
    resetZoom() {
      this.$refs.chart.chart.resetZoom();
    }
  }
};
</script>

<style lang="scss" scoped>
#graph {
  display: flex;
  max-width: 85vw !important;
  max-height: 50vh !important;
}

.graph {
  height: 40rem;
  width: 85rem;
  padding: 5px;
  background-color: var(--graph-bg);
  border: var(--dark-blue) 5px solid;
  border-radius: 10px;

  @media screen and (min-width: 600px) and (max-width: 799px) {
    height: 30rem;
    width: 45rem;
  }

  @media screen and (min-width: 450px) and (max-width: 599px) {
    height: 30rem;
    width: 25rem;
  }

  @media screen and (max-width: 449px) {
    height: 25rem;
    width: 18rem;
  }
}

.reset {
  width: 6rem;
  height: 3rem;
}
</style>