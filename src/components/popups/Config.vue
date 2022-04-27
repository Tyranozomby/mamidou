<template>
  <div class="popup">
    <div class="container">
      <div>
        <close-button @click="close"/>
        <h2>{{ $t("config.title") }}</h2>
      </div>
      <div class="content">
        <p></p>
      </div>
    </div>
  </div>
</template>

<script>
import CloseButton from "@/components/popups/CloseButton";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Config",
  components: {CloseButton},
  methods: {
    close() {
      const config = document.getElementById("config")
      config.style.display = "none"
    }
  }
}
</script>

<style scoped>

</style>