<template>
  <Header id="app-header" @show="m => this.mode = m"/>

  <div class="background">
    <ul class="bubbles">
      <li v-for="_ in 10" :key="_"/>
    </ul>
  </div>

  <div id="app-content">
    <div style="display: flex; align-items: center; flex-direction: column">
      <div class="toggle">
        <h3 style="grid-area: 1 / 2">{{ $t("main.mode") }}</h3>
        <h3 style="grid-area: 2 / 1">{{ $t("basics.age") }}</h3>
        <div id="toggleButton" style="grid-area: 2 / 2">
          <input id="toggle" v-model="toggle" type="checkbox">
          <label class="button" for="toggle"/>
        </div>
        <h3 style="grid-area: 2 / 3">{{ $t("basics.date") }}</h3>
        <button class="reset" style="grid-area: 3 / 2" @click="$refs.graph.resetZoom()">Reset zoom</button>
      </div>
      <Graph v-if="$store.getters.children != null && $store.getters.data != null" ref="graph" :type="type"/>
    </div>
  </div>

  <Config v-if="mode === 1" @close="mode = 0"/>
  <Help v-else-if="mode === 2" @close="mode = 0"/>
  <Birthday v-else-if="mode === 3" @close="mode = 0"/>
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
      mode: 0
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

<style lang="scss">
// ----- BASICS -----
@import "style/basics.scss";

// ----- TOGGLE -----
@import "style/toggle.scss";

// ----- BACKGROUND -----
@import "style/background.scss";

#app {
  width: 100% !important;
  height: 100% !important;
  display: flex;
  flex-direction: column;
}

#app-header {
  height: 6rem;
}

#app-content {
  display: flex;
  flex-direction: column !important;
  align-items: center;
  justify-content: center;
}

.reset {
  width: 12rem;
}
</style>