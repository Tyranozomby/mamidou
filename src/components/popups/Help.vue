<template>
  <div ref="help" class="popup">
    <div class="blocker" @click="close"/>
    <div class="container">
      <div>
        <close-button @click="close"/>
        <h2>{{ $t("help.title") }}</h2>
      </div>
      <div class="content">
        <p>{{ $t('help.explication') }}</p>
        <p v-html="$t('help.infos')"/>
        <p class="red" v-html="$t('help.msg')"/>
      </div>
      <small>Eliott - 21 juin 2022</small>
    </div>
  </div>
</template>

<script>
import CloseButton from "@/components/popups/CloseButton";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Help",
  components: {CloseButton},
  methods: {
    close() {
      this.$emit("close")
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/popups.scss";

.container {
  row-gap: 2rem;
}

.content {
  margin: 2.5rem 2rem 2rem;
  text-align: center;
  overflow-y: auto;
}

small {
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  color: var(--dark-blue);
  text-align: center;
}

.red {
  color: var(--red);
  font-weight: bold;
}
</style>