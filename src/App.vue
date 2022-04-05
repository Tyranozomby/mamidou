<template>
  <div>
    <Header id="header" v-model="type"/>
    <div id="content">
      <Graph id="graph" :type="type" :children="children" :donnees="donnees" @pointClicked="pointClicked"/>
      <SidePage id="side" :children="children" :donnees="donnees" :point="point" @updateChildren="updateChildren"
                @updateData="updateData"/>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Graph from "@/components/Graph";
import SidePage from "@/components/SidePage";
import axios from "axios";

export default {
  name: 'App',
  components: {
    SidePage,
    Graph,
    Header
  },
  data() {
    return {
      type: "ta",
      children: null,
      donnees: null,
      point: {}
    }
  },
  methods: {
    updateChildren: async function (data) {
      if (!data) {
        const response = await axios.get("//localhost:3000/api/children");
        data = response.data;
      }
      this.children = data;
    },
    updateData: async function (data) {
      if (!data) {
        const response = await axios.get("//localhost:3000/api/data");
        data = response.data;
      }
      this.donnees = data;
    },
    pointClicked: function (data) {
      this.point = data
    }
  },
  created() {
    this.updateChildren();
    this.updateData();
  }
}
</script>

<style>
#header {
  height: 5vh
}

#content {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 90%;
}

#graph {
  flex-grow: 2;
}

#side {
  padding: 1rem;
  width: 20%;
  display: block;
  background-color: darkcyan;
}

</style>
