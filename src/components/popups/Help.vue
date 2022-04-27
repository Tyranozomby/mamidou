<template>
  <div class="popup">
    <div class="container">
      <div>
        <close-button @click="close"/>
        <h2>{{ $t("help.title") }}</h2>
      </div>
      <p class="content">
        <!--TODO-->
        - Présentation site<br/>
        - Différentes explications sur les boutons<br/>
        - Petit message anniversaire<br/>
      </p>
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
      const help = document.getElementById("help")
      help.style.display = "none"
    }
  }
}
</script>

<style scoped>
.content {
  flex-grow: 1;
  margin: 5rem 2rem 2rem;
  text-align: center;
}
</style>