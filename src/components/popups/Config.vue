<template>
  <div class="popup">
    <div class="container">
      <div>
        <close-button @click="close"/>
        <h2>{{ $t("config.title") }}</h2>
      </div>
      <login-config v-if="!$store.getters.isConnected"/>
      <div v-else class="center">
        <div id="titles">
          <p class="title" @click="(e) => mode('edit', e)">{{ $t("config.edit") }}</p>
          <p class="title selected" @click="(e) => mode('add', e)">{{ $t("config.add") }}</p>
          <p class="title" @click="(e) => mode('delete', e)">{{ $t("config.delete") }}</p>
        </div>
        <div id="editing" class="center">
          <edit-config class="configMode" id="edit"/>
          <add-config class="configMode" id="add"/>
          <delete-config class="configMode" id="delete"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CloseButton from "@/components/popups/CloseButton";
import EditConfig from "@/components/popups/config/editConfig";
import LoginConfig from "@/components/popups/config/loginConfig";
import AddConfig from "@/components/popups/config/addConfig";
import DeleteConfig from "@/components/popups/config/deleteConfig";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Config",
  components: {DeleteConfig, AddConfig, LoginConfig, EditConfig, CloseButton},
  methods: {
    close() {
      const config = document.getElementById("config")
      config.style.display = "none"
    },
    mode(mode, e) {
      // Définit le texte cliqué comme sélectionné
      Array.from(document.getElementsByClassName("title")).forEach(t => t.classList.remove("selected"))
      e.target.classList.add("selected")

      // Affiche le contenu correspondant
      Array.from(document.getElementsByClassName("configMode")).forEach(m => m.style.display = "none")
      document.getElementById(mode).style.display = "flex"
    }
  },
  mounted() {
    document.querySelector(".configMode#add").style.display = "flex"
  }
}
</script>

<style scoped>
/*Ajoute ce fichier partout, il n'est pas limité comme les éléments ajoutés habituellement*/
@import "@/style/configParts.css";

.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
}

#titles {
  display: flex;
  justify-content: center;
  background-color: var(--white);
  border-radius: 50px;
  margin: 2rem 8rem;
  padding: 1rem 0;
}

.title {
  margin: 0 1.5rem;
  padding: .2rem 1.5rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 50px;
}

.selected {
  color: var(--red-salsa);
  background-color: var(--fluorescent-blue);
}

#editing {
  flex-direction: row;
  flex-wrap: nowrap;
  flex-grow: 1;
  margin: 0 2rem 3rem;
}

.configMode {
  display: none;
}
</style>