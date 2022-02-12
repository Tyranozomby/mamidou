<template>
  <Header v-model="type"/>
  <Graph :type="type"/>
</template>

<script>
import Header from "@/components/Header";
import Graph from "@/components/Graph";

export default {
  name: 'App',
  components: {
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

</style>
