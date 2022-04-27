<template>
  <div>
    <div id="ajout">
      <h2>Ajout</h2>
      <div>
        <h3>Valeur</h3>
        <form @submit.prevent="valider" id="ajout-val">
          <select>
            <option v-bind:key="name" v-for="name in this.names">{{ name }}</option>
          </select>
          <input type="date" v-model="today">
          <input type="number" placeholder="Taille (cm)" step=".1">
          <button type="submit">Valider</button>
        </form>
      </div>
      <hr width="80%">
      <div>
        <h3>Enfant</h3>
        <form @submit.prevent="valider" id="ajout-enf">
          <input type="text" placeholder="Prénom">
          <input type="color" placeholder="Couleur">
          <input type="date" placeholder="Date de naissance">
          <button type="submit">Valider</button>
        </form>
      </div>
    </div>
    <hr>
    <div id="modif">
      <h2>Modifier</h2>
      <div>
        <h3>Valeur</h3>
        <form @submit.prevent="valider" id="modif-val">
          <input type="text" disabled placeholder="Cliquez sur un point" id="modif-val-nom">
          <input type="date" disabled id="modif-val-date">
          <input type="number" step=".1" placeholder="Taille (cm)" id="modif-val-val">
          <button type="submit">Valider</button>
        </form>
      </div>
    </div>
    <hr>
    <div id="suppr">
      <h2>Supprimer</h2>
      <div>
        <h3>Valeur</h3>
        <form @submit.prevent="valider" id="suppr-val">
          <input type="text" disabled placeholder="Cliquez sur un point" id="suppr-val-nom">
          <input type="date" disabled id="suppr-val-date">
          <input type="number" step=".1" placeholder="Taille (cm)" id="suppr-val-val">
          <input type="number" step="1" hidden id="suppr-val-pos">
          <button type="submit">Supprimer</button>
        </form>
      </div>
      <hr width="80%">
      <div>
        <h3>Enfant</h3>
        <form @submit.prevent="valider" id="suppr-enf">
          <select>
            <option v-bind:key="name" v-for="name in this.names">{{ name }}</option>
          </select>
          <button type="submit">Supprimer</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import ParseDate from "date-fns/parse";
import {fr} from "date-fns/locale";
import RequestsService from "/src/services/requestsServices"

export default {
  name: "SidePage",
  props: ["children", "donnees", "point"],
  data: function () {
    return {
      today: this.getTodayString()
    }
  },
  watch: {
    point: function () {
      const nom = document.getElementById("modif-val-nom")
      const date = document.getElementById("modif-val-date")
      const val = document.getElementById("modif-val-val")

      const nom2 = document.getElementById("suppr-val-nom")
      const date2 = document.getElementById("suppr-val-date")
      const val2 = document.getElementById("suppr-val-val")
      const pos = document.getElementById("suppr-val-pos")

      if (Object.keys(this.point).length !== 0) {
        nom.value = this.point.child;
        nom2.value = this.point.child;

        date.value = this.point.date.split("/").reverse().join("-");
        date2.value = this.point.date.split("/").reverse().join("-");

        val.value = this.point.value;
        val2.value = this.point.value;

        pos.value = this.point.pos
      }
    }
  },
  computed: {
    names: function () {
      if (this.children)
        return Object.keys(this.children).sort((a, b) => {
          const date1 = this.strToDate(this.children[a].date);
          const date2 = this.strToDate(this.children[b].date);

          if (date1 < date2)
            return 1
          else
            return -1
        });
      else
        return [];
    }
  },
  methods: {
    strToDate: function (str) {
      return ParseDate(str, 'dd/MM/yyyy', new Date(), {locale: fr})
    },
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
      let child, date, value, color
      switch (e.target.id) {
        case "ajout-val":
          child = e.target[0].value
          date = e.target[1].value.split("-").reverse().join("/")
          value = e.target[2].value

          response = RequestsService.addData(child, date, value)
          this.$emit('updateData', response.data)
          break;

        case "ajout-enf":
          child = e.target[0].value
          color = e.target[1].value
          date = e.target[2].value.split("-").reverse().join("/")

          response = await RequestsService.addChild(child, date, color)
          this.$emit('updateChildren', response.data)
          break;

        case "modif-val":
          child = e.target[0].value
          date = e.target[1].value.split("-").reverse().join("-")
          value = e.target[2].value

          response = await RequestsService.editData(child, date, value)
          this.$emit('updateData', response.data)
          break;

        case "suppr-val":
          if (confirm("Es-tu sûr(e) de vouloir supprimer ces données ?")) {
            child = e.target[0].value
            const pos = e.target[3].value

            response = await RequestsService.deleteData(child, pos)
            this.$emit('updateData', response.data)
          }
          break;

        case "suppr-enf":
          if (confirm("Es-tu sûr(e) de vouloir supprimer cet enfant ?")) {
            child = e.target[0].value

            response = await RequestsService.deleteAllData(child)
            this.$emit('updateData', response.data)

            response = await RequestsService.deleteChild(child)
            this.$emit('updateChildren', response.data)
          }
          break;
      }
    }
  }
}
</script>

<style scoped>

</style>