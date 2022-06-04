<template>
  <Header id="header"/>
  <div id="content">
    <div>
      <h3>{{ $t("main.mode") }}</h3>
      <div id="graphMode">
        <h3>{{ $t("basics.age") }}</h3>
        <div id="toggleButton">
          <input id="toggle" v-model="toggle" type="checkbox">
          <label class="button" for="toggle"></label>
        </div>
        <h3>{{ $t("basics.date") }}</h3>
      </div>
    </div>
    <Graph v-if="$store.getters.children != null && $store.getters.data != null" id="graph" :type="type"
           @pointClicked="pointClicked"/>
  </div>
  <Config id="config"/>
  <Help id="help"/>
  <Birthday id="birthday"/>
</template>

<script>
import RequestsServices from "@/services/requestsServices";

import Header from "@/components/Header";
import Graph from "@/components/Graph";

import Config from "@/components/popups/Config";
import Help from "@/components/popups/Help";
import Birthday from "@/components/popups/Birthday";

export default {
  name: 'App',
  components: {
    Header,
    Graph,
    Config,
    Help,
    Birthday
  },
  data() {
    return {
      toggle: false,
      point: {}
    }
  },
  computed: {
    type() {
      if (this.toggle)
        return "td"
      else
        return "ta"
    }
  },
  methods: {
    pointClicked: function (data) {
      this.point = data
    }
  },
  async beforeMount() {
    // Load the data needed
    await this.$store.dispatch("updateChildren")
    await this.$store.dispatch("updateData")

    if (localStorage.getItem('lang')) {
      this.$root.$i18n.locale = localStorage.getItem('lang')
    } else {
      const lang = navigator.language.substring(0, 2)
      if (lang === "en" || lang === "fr") {
        this.$root.$i18n.locale = lang
      } else {
        this.$root.$i18n.locale = "en"
      }
    }
  },
  async mounted() {
    if (this.$store.getters.isConnected) {
      const tok = await RequestsServices.refreshToken()

      if (tok.status === 200)
        this.$store.commit("login", {token: tok.data})
      else
        this.$store.commit("logout")
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'Lovelo';
  font-style: normal;
  font-weight: 900;
  src: local('Lovelo'), url(https://fonts.cdnfonts.com/s/18519/Lovelo-Black.woff) format('woff');
}

@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/opensans/v28/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsiH0B4gaVI.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

:root {
  --rich-black: #042A2B;
  --maximum-blue: #5EB1BF;
  --fluorescent-blue: #54F2F2;
  --white: #FCFCFC;
  --red-salsa: #F05D5E;
  --graph-bg: #adeaea;

  --iconBallSize: 4.5rem;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

body {
  background-color: var(--fluorescent-blue);
}

@media screen and (max-width: 600px) {
  :root {
    --iconBallSize: 3.5rem;
  }
}

h1, h2, h3 {
  text-align: center;
  color: var(--rich-black);
  margin: 0;
}

h1 {
  font-family: 'Lovelo', sans-serif;
  font-size: 4.5rem;
}

h2 {
  margin-top: 1rem;
  font-family: 'Lovelo', sans-serif;
  font-size: 3rem;
  color: var(--fluorescent-blue);
  text-shadow: -1px -1px 0 var(--rich-black),
  0 -1px 0 var(--rich-black),
  1px -1px 0 var(--rich-black),
  1px 0 0 var(--rich-black),
  1px 1px 0 var(--rich-black),
  0 1px 0 var(--rich-black),
  -1px 1px 0 var(--rich-black),
  -1px 0 0 var(--rich-black);
}

h3 {
  font-family: 'Open Sans', sans-serif;
  font-weight: normal;
  font-size: 2rem;
}

p {
  font-family: 'Open Sans', sans-serif;
  font-weight: normal;
  font-size: 1.6rem;
  color: var(--rich-black);
}

u {
  text-decoration: underline solid var(--rich-black) 2px;
}

#app {
  width: 100% !important;
  height: 100% !important;
  display: flex;
  flex-direction: column;
}

#header {
  height: 6rem
}

#content {
  display: flex;
  flex-direction: column !important;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  margin: 1rem;
}


#graph {
  display: flex;
  justify-content: center;
}

#graphMode {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1.5rem;
}

#toggleButton {
  height: 2rem;
  margin: 0 1rem;
}

#toggle {
  display: none;
}

.button {
  display: inline-block;
  width: 90px;
  height: 35px;
  background-color: var(--fluorescent-blue);
  border-radius: 30px;
  position: relative;
  cursor: pointer;
  box-shadow: 0 0 15px -5px var(--rich-black);
}

.button::after {
  content: " ";
  width: 40px;
  height: 40px;
  background-color: var(--red-salsa);
  border: 2px solid var(--white);
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, .25);
  position: absolute;
  top: -5px;
  left: 0;
  display: grid;
  place-content: center;
  transition: background-color .5s, transform .5s ease-in;
}

#toggle:checked + .button::after {
  background-color: var(--maximum-blue);
  transform: translateX(50px);
}

#help, #birthday, #config {
  display: none;
}

.popup {
  position: absolute;
  width: 100% !important;
  height: 100% !important;
  background-color: rgba(4, 42, 43, 0.8);

  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  position: relative;
  width: 60rem;
  height: 65%;
  background-color: var(--fluorescent-blue);
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
}

span.error {
  margin: 0;
  padding: 0;
  color: var(--red-salsa);
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 16px;
}
</style>