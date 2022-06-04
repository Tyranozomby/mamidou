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
          <p class="title" :class="this.mode === 0 ? 'selected' : ''" @click="() => this.mode = 0">
            {{ $t("config.edit") }}
          </p>
          <p class="title" :class="this.mode === 1 ? 'selected' : ''" @click="() => this.mode = 1">
            {{ $t("config.add") }}
          </p>
          <p class="title" :class="this.mode === 2 ? 'selected' : ''" @click="() => this.mode = 2">
            {{ $t("config.delete") }}
          </p>
        </div>
        <div id="editing" class="center">
          <edit-config ref="edit" class="configMode" id="edit" v-show="mode === 0"/>
          <add-config ref="add" class="configMode" id="add" v-show="mode === 1"/>
          <delete-config ref="delete" class="configMode" id="delete" v-show="mode === 2"/>
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
  data() {
    return {mode: 1}
  },
  methods: {
    close() {
      const config = document.getElementById("config")
      config.style.display = "none"
    }
  },
  watch: {
    "$store.getters.names": {
      deep: true,
      immediate: true,
      handler() {
        if (this.$refs.edit) {
          this.$refs.edit.selectedChildChild = ""
          this.$refs.edit.selectedChildValue = ""
          this.$refs.edit.$refs.select.value = ""
        }
        if (this.$refs.add) {
          this.$refs.add.selectedChild = ""
        }
        if (this.$refs.delete) {
          this.$refs.delete.selectedChild = ""
          this.$refs.delete.$refs.select.value = ""
        }
      }
    }
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
  display: flex;
  flex-direction: row;
}
</style>