<template>
  <div>
    <div id="left">
      <h3>{{ $t("config.child") }}</h3>
      <form @submit.prevent="valider" class="configForm addChild">
        <div class="inputGroup">
          <label for="addChildName">{{ $t('basics.name') }}</label>
          <input required id="addChildName" type="text" :placeholder="$t('placeholders.name')">
        </div>

        <div class="inputGroup">
          <label for="addChildColor">{{ $t('basics.color') }}</label>
          <input required id="addChildColor" type="color" :title="$t('placeholders.color')">
        </div>

        <div class="inputGroup">
          <label for="addChildBirth">{{ $t('basics.birthday') }}</label>
          <input required id="addChildBirth" type="date">
        </div>

        <button type="submit">{{ $t('basics.send') }}</button>
      </form>
    </div>
    <div id="right">
      <h3>{{ $t("config.value") }}</h3>
      <form @submit.prevent="valider" class="configForm addValue">
        <div class="inputGroup">
          <label for="addValueChild">{{ $t("basics.name") }}</label>
          <select v-model="selectedChild" id="addValueChild" required>
            <option value="" disabled selected>{{ $t('placeholders.child') }}</option>
            <option :key="name" v-for="name in $store.getters.names">{{ name }}</option>
          </select>
        </div>

        <div class="inputGroup">
          <label for="addValueDate">{{ $t("basics.date") }}</label>
          <input id="addValueDate" type="date" :value="today" :disabled="selectedChild === ''" required>
        </div>

        <div class="inputGroup">
          <label for="addValueHeight">{{ $t("basics.height") }}</label>
          <input id="addValueHeight" type="number" :placeholder="$t('placeholders.height')" min="1" step=".1"
                 :disabled="selectedChild === ''" required>
        </div>

        <button type="submit">{{ $t('basics.send') }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import RequestsService from "@/services/requestsServices";

export default {
  name: "addConfig",
  data() {
    return {
      selectedChild: ""
    }
  },
  methods: {
    async valider(e) {
      if (e.target.classList.contains("addChild")) {
        const child = e.target[0].value
        const color = e.target[1].value
        const date = e.target[2].value.split("-").reverse().join("/")

        if (this.$store.getters.names.includes(child))
          return

        const response = await RequestsService.addChild(child, date, color)

        if (response.status === 200)
          await this.$store.dispatch("updateChildren")

      } else if (e.target.classList.contains("addValue")) {
        const child = e.target[0].value
        const date = e.target[1].value.split("-").reverse().join("/")
        const value = e.target[2].value

        const response = await RequestsService.addData(child, date, value)

        if (response.status === 200)
          await this.$store.dispatch("updateData")
      }
    }
  },
  computed: {
    today() {
      const today = new Date();

      let month = (today.getMonth() + 1);
      let day = today.getDate();

      if (month < 10)
        month = "0" + month;
      if (day < 10)
        day = "0" + day;

      return today.getFullYear() + '-' + month + '-' + day
    }
  }
}
</script>

<style scoped>

</style>