<template>
  <div class="popup">
    <div class="container">
      <div>
        <close-button @click="close"/>
        <h2>{{ $t("config.title") }}</h2>
      </div>
      <div v-if="!$store.getters.isConnected" class="content">
        <p>{{ $t("config.notConnected") }}</p>
        <form @submit.prevent="login">
          <div id="input">
            <input id="password" autocomplete="password" type="password" :placeholder="$t('config.password')"/>

            <svg @click="eye(1)" id="eye-on" viewBox="0 0 24 24">
              <title>{{this.$t('config.eye-on')}}</title>
              <rect width="24" height="24" opacity="0"/>
              <path
                  d="M21.87 11.5c-.64-1.11-4.16-6.68-10.14-6.5-5.53.14-8.73 5-9.6 6.5a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25c5.53-.14 8.74-5 9.6-6.5a1 1 0 0 0 0-1zM12.22 17c-4.31.1-7.12-3.59-8-5 1-1.61 3.61-4.9 7.61-5 4.29-.11 7.11 3.59 8 5-1.03 1.61-3.61 4.9-7.61 5z"/>
              <path
                  d="M12 8.5a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 8.5zm0 5a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z"/>
            </svg>

            <svg @click="eye(0)" id="eye-off" viewBox="0 0 24 24">
              <title>{{this.$t('config.eye-off')}}</title>
              <rect width="24" height="24" opacity="0"/>
              <path
                  d="M4.71 3.29a1 1 0 0 0-1.42 1.42l5.63 5.63a3.5 3.5 0 0 0 4.74 4.74l5.63 5.63a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM12 13.5a1.5 1.5 0 0 1-1.5-1.5v-.07l1.56 1.56z"/>
              <path
                  d="M12.22 17c-4.3.1-7.12-3.59-8-5a13.7 13.7 0 0 1 2.24-2.72L5 7.87a15.89 15.89 0 0 0-2.87 3.63 1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25a9.48 9.48 0 0 0 3.23-.67l-1.58-1.58a7.74 7.74 0 0 1-1.7.25zM21.87 11.5c-.64-1.11-4.17-6.68-10.14-6.5a9.48 9.48 0 0 0-3.23.67l1.58 1.58a7.74 7.74 0 0 1 1.7-.25c4.29-.11 7.11 3.59 8 5a13.7 13.7 0 0 1-2.29 2.72L19 16.13a15.89 15.89 0 0 0 2.91-3.63 1 1 0 0 0-.04-1z"/>
            </svg>
          </div>
          <button id="submit" type="submit">Se connecter</button>
        </form>
      </div>
      <div v-else class="center">
        <div id="titles">
          <p class="title" @click="(e) => mode('edit', e)">{{ $t("config.edit") }}</p>
          <p class="title selected" @click="(e) => mode('add', e)">{{ $t("config.add") }}</p>
          <p class="title" @click="(e) => mode('delete', e)">{{ $t("config.delete") }}</p>
        </div>
        <div id="editing" class="center">
          <div id="left">
            <h3>{{ $t("config.child") }}</h3>
            <div style="display: none" class="child" id="child-edit">edit</div>
            <div class="child" id="child-add">add</div>
            <div style="display: none" class="child" id="child-delete">delete</div>
          </div>
          <div id="right">
            <h3>{{ $t("config.value") }}</h3>
            <div style="display: none" class="value" id="value-edit">edit</div>
            <div class="value" id="value-add">add</div>
            <div style="display: none" class="value" id="value-delete">delete</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RequestsServices from "@/services/requestsServices";
import CloseButton from "@/components/popups/CloseButton";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Config",
  components: {CloseButton},
  methods: {
    close() {
      const config = document.getElementById("config")
      config.style.display = "none"
    },
    async login(e) {
      const response = await RequestsServices.login(e.target[0].value)
      if (response.status === 200) {
        this.$store.commit("login", {token: response.data})
      } else {
        this.$store.commit("logout")
      }
    },
    eye(int) {
      if (int === 1) {
        document.getElementById("eye-on").style.display = "none"
        document.getElementById("eye-off").style.display = "block"
        document.getElementById("password").type = "text"
      } else {
        document.getElementById("eye-on").style.display = "block"
        document.getElementById("eye-off").style.display = "none"
        document.getElementById("password").type = "password"
      }
    },
    mode(mode, e) {
      Array.from(document.getElementsByClassName("title")).forEach(t => t.classList.remove("selected"))
      e.target.classList.add("selected")

      Array.from(document.getElementsByClassName("child")).forEach(c => c.style.display = "none")
      document.getElementById("child-" + mode).style.display = "flex"

      Array.from(document.getElementsByClassName("value")).forEach(v => v.style.display = "none")
      document.getElementById("value-" + mode).style.display = "flex"
      switch (mode) {
        case "add":
          break
        case "edit":
          break
        case "delete":
          break
      }
    }
  }
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  height: 60%;
  margin-top: 1rem;

  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1.8;
}

form {
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  align-items: center;
  justify-content: center;
}

#input {
  display: flex;
  align-items: center;
}

#input svg {
  margin-left: -3rem;
  width: 2.5rem;
  height: 2.5rem;
  fill: var(--rich-black)
}

#eye-off {
  display: none;
}

#password {
  height: 4rem;
  width: 15rem;
  background-color: var(--white);
  padding: 0 1rem;
}

#submit {
  height: 4rem;
  width: 18rem;
  background-color: var(--red-salsa);
  text-align: center;
  cursor: pointer;
}

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

#left, #right {
  padding: 0 3rem;
  height: 100%;
  width: 100%;
}

#left {
  border-right: var(--rich-black) 1px solid;
}
</style>