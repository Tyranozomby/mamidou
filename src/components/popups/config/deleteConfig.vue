<template>
  <div>
    <div id="left">
      <h3>{{ $t("config.child") }}</h3>
      <form @submit.prevent="valider" class="configForm deleteChild">
        <div class="inputGroup">
          <label for="deleteChildChild">{{ $t('basics.child') }}</label>
          <select id="deleteChildChild" required>
            <option value="" disabled selected>{{ $t('placeholders.child') }}</option>
            <option v-bind:key="name" v-for="name in $store.getters.names">{{ name }}</option>
          </select>
        </div>

        <button type="submit">{{ $t('basics.send') }}</button>
      </form>
    </div>
    <div id="right">
      <h3>{{ $t("config.value") }}</h3>
      <form @submit.prevent="valider" class="configForm deleteValue">
        <div class="inputGroup">
          <label for="deleteValueChild">{{ $t('basics.child') }}</label>
          <select @change="changeChild"
                  v-model="selectedChild" id="deleteValueChild" required>
            <option value="" disabled selected>{{ $t('placeholders.child') }}</option>
            <option v-bind:key="name" v-for="name in $store.getters.names">{{ name }}</option>
          </select>
        </div>

        <div class="inputGroup">
          <label for="deleteValueDate">{{ $t('placeholders.choose') }}</label>
          <select ref="select" id="deleteValueDate" required :disabled="selectedChild === ''">
            <option value="" disabled selected>{{ $t('placeholders.child') }} {{ $t('basics.before') }}</option>
            <option v-for="data in $store.getters.data[selectedChild]" v-bind:key="data" :value="data.date">
              {{ data.date }} - {{ data.value }} cm
            </option>
          </select>
        </div>

        <button type="submit">{{ $t('basics.send') }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import RequestsService from "@/services/requestsServices";

export default {
  name: "deleteConfig",
  data() {
    return {
      selectedChild: ""
    }
  },
  methods: {
    async valider(e) {
      if (e.target.classList.contains("deleteChild")) {
        const child = e.target[0].value
        if (child === "") return

        let r = await RequestsService.deleteAllData(child)
        if (r.status !== 200) return

        await this.$store.dispatch("updateData")

        r = await RequestsService.deleteChild(child)
        this.selectedChild = ""

        if (r.status === 200) {
          await this.$store.dispatch("updateChildren")
        }

      } else if (e.target.classList.contains("deleteValue")) {
        const child = e.target[0].value
        const data = e.target[1].value

        if (!this.$store.getters.data[this.selectedChild]) return

        const pos = this.$store.getters.data[this.selectedChild].findIndex(o => o.date === data)

        if (pos === -1) return

        const response = await RequestsService.deleteData(child, pos)

        if (response.status === 200)
          await this.$store.dispatch("updateData")
      }
    },
    changeChild() {
      let querySelector = document.querySelector('#deleteValueDate');
      querySelector.children[0].selected = true
    }
  }
}
</script>

<style scoped>

</style>