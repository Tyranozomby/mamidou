<template>
  <div>
    <div id="left">
      <h3>{{ $t("config.child") }}</h3>
      <form @submit.prevent="valider" class="configForm editChild">
        <div class="inputGroup">
          <label for="editChildChild">{{ $t('basics.child') }}</label>
          <select v-model="selectedChildChild" id="editChildChild" required>
            <option value="" disabled selected>{{ $t('placeholders.child') }}</option>
            <option v-for="name in $store.getters.names" :key="name">{{ name }}</option>
          </select>
        </div>

        <div class="inputGroup">
          <label for="editChildColor">{{ $t('basics.color') }}</label>
          <input type="color" :title="$t('placeholders.color')" :disabled="selectedChildChild === ''"
                 :value="(selectedChildChild !== '' && $store.getters.children[selectedChildChild]) ? $store.getters.children[selectedChildChild].color : '#aaaaaa'">
        </div>

        <div class="inputGroup">
          <label for="editChildDate">{{ $t('basics.birthday') }}</label>
          <input type="date" :disabled="selectedChildChild === ''"
                 :value="selectedChildChild !== '' && $store.getters.children[selectedChildChild] ? ($store.getters.children[selectedChildChild].date).split('/').reverse().join('-') : null">
        </div>

        <button type="submit">{{ $t('basics.send') }}</button>
      </form>
    </div>
    <div id="right">
      <h3>{{ $t("config.value") }}</h3>
      <form @submit.prevent="valider" class="configForm editValue">
        <div class="inputGroup">
          <label for="editValueChild">{{ $t('basics.child') }}</label>
          <select @change="changeChild" v-model="selectedChildValue" id="editValueChild" required>
            <option value="" disabled selected>{{ $t('placeholders.child') }}</option>
            <option v-bind:key="name" v-for="name in $store.getters.names">{{ name }}</option>
          </select>
        </div>

        <div class="inputGroup">
          <label for="editValueDate">{{ $t('placeholders.choose') }}</label>
          <select ref="select" id="editValueDate" required :disabled="selectedChildValue === ''">
            <option value="" disabled selected>{{ $t('placeholders.child') }} {{ $t('basics.before') }}</option>
            <option v-for="data in $store.getters.data[selectedChildValue]" v-bind:key="data" :value="data.date">
              {{ data.date }} - {{ data.value }} cm
            </option>
          </select>
        </div>

        <div class="inputGroup">
          <label for="editValueHeight">{{ $t("basics.height") }}</label>
          <input id="editValueHeight" type="number" :placeholder="$t('placeholders.height')" min="1" step=".1"
                 :disabled="selectedChildValue === ''" required>
        </div>

        <button type="submit">{{ $t('basics.send') }}</button>
      </form>
    </div>
  </div>
</template>

<script>

import RequestsService from "@/services/requestsServices";

export default {
  name: "editConfig",
  data() {
    return {
      selectedChildValue: "",
      selectedChildChild: ""
    }
  },
  methods: {
    async valider(e) {
      if (e.target.classList.contains("editChild")) {
        const child = e.target[0].value
        const color = e.target[1].value
        const date = e.target[2].value.split("-").reverse().join("/")

        const response = await RequestsService.addChild(child, date, color)

        if (response.status === 200)
          await this.$store.dispatch("updateChildren")
      } else if (e.target.classList.contains("editValue")) {
        const child = e.target[0].value
        const date = e.target[1].value.replaceAll("/", "-")
        const value = e.target[2].value

        const response = await RequestsService.editData(child, date, value)

        if (response.status === 200)
          await this.$store.dispatch("updateData")
      }
    },
    changeChild() {
      let querySelector = document.querySelector('#editValueDate');
      querySelector.children[0].selected = true
    }
  }
}
</script>

<style scoped>

</style>