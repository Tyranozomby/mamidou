<template>
  <div>
    <Header v-model="type"/>
    <div id="content">
      <Graph id="graph" :type="type"/>
      <SidePage class="side"/>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Graph from "@/components/Graph";
import SidePage from "@/components/SidePage";

export default {
  name: 'App',
  components: {
    SidePage,
    Graph,
    Header
  },
  data() {
    return {
      type: "ta"
    }
  },
}
</script>

<style>
#content {
  display: flex;
  flex-direction: row;
  width: 100%;
}

#graph {
  flex-grow: 2;
}

.side {
  display: none;
}

</style>
