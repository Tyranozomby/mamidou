<template>
  <div>
    <div id="ajout">
      <h2>Ajout</h2>
      <div>
        <form @submit.prevent="valider" id="ajout-val">
          <h3>Valeur</h3>
          <select>
            <option v-bind:key="name" v-for="name in this.names">{{ name }}</option>
          </select>
          <input type="date" v-model="today">
          <input type="number" placeholder="Taille (cm)" step=".1">
          <button type="submit">Valider</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SidePage",
  props: ["children", "donnees"],
  data: function () {
    return {
      today: this.getTodayString()
    }
  },
  computed: {
    names: function () {
      if (this.children)
        return Object.keys(this.children);
      else
        return [];
    }
  },
  methods: {
    getTodayString: function () {
      const today = new Date();
      let month = (today.getMonth() + 1);
      let day = today.getDate();
      if (month < 10)
        month = "0" + month;
      if (day < 10)
        day = "0" + day;
      return today.getFullYear() + '-' + month + '-' + day
    },
    valider: async function (e) {
      let response;
      if (e.target.id === "ajout-val") {
        const child = e.target[0].value;
        const date = (e.target[1].value).split("-").reverse().join("/")
        const value = e.target[2].value

        response = await axios.put("//localhost:3000/api/data/" + child, {date: date, value: value})
        console.log(response.data)
        this.$emit('updateData', response.data)
      }
    }
  }
}
</script>

<style scoped>

</style>