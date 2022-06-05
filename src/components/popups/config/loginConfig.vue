<template>
  <div class="content">
    <p>{{ $t("config.notConnected") }}</p>
    <form ref="form" @submit.prevent="login">
      <div id="input">
        <input ref="password" :placeholder="$t('config.password')" autocomplete="password" autofocus="autofocus"
               type="password"/>

        <svg ref="eye-on" viewBox="0 0 24 24" @click="eye(1)">
          <title>{{ $t('config.eye-on') }}</title>
          <rect height="24" opacity="0" width="24"/>
          <path
              d="M21.87 11.5c-.64-1.11-4.16-6.68-10.14-6.5-5.53.14-8.73 5-9.6 6.5a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25c5.53-.14 8.74-5 9.6-6.5a1 1 0 0 0 0-1zM12.22 17c-4.31.1-7.12-3.59-8-5 1-1.61 3.61-4.9 7.61-5 4.29-.11 7.11 3.59 8 5-1.03 1.61-3.61 4.9-7.61 5z"/>
          <path
              d="M12 8.5a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 8.5zm0 5a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z"/>
        </svg>

        <svg ref="eye-off" style="display: none" viewBox="0 0 24 24" @click="eye(0)">
          <title>{{ $t('config.eye-off') }}</title>
          <rect height="24" opacity="0" width="24"/>
          <path
              d="M4.71 3.29a1 1 0 0 0-1.42 1.42l5.63 5.63a3.5 3.5 0 0 0 4.74 4.74l5.63 5.63a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM12 13.5a1.5 1.5 0 0 1-1.5-1.5v-.07l1.56 1.56z"/>
          <path
              d="M12.22 17c-4.3.1-7.12-3.59-8-5a13.7 13.7 0 0 1 2.24-2.72L5 7.87a15.89 15.89 0 0 0-2.87 3.63 1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25a9.48 9.48 0 0 0 3.23-.67l-1.58-1.58a7.74 7.74 0 0 1-1.7.25zM21.87 11.5c-.64-1.11-4.17-6.68-10.14-6.5a9.48 9.48 0 0 0-3.23.67l1.58 1.58a7.74 7.74 0 0 1 1.7-.25c4.29-.11 7.11 3.59 8 5a13.7 13.7 0 0 1-2.29 2.72L19 16.13a15.89 15.89 0 0 0 2.91-3.63 1 1 0 0 0-.04-1z"/>
        </svg>
      </div>
      <span ref="login_error" class="error" style="display: none">{{ $t('config.wrong_password') }}</span>
      <button id="submit" type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script>
import RequestsServices from "@/services/requestsServices";

export default {
  name: "loginConfig",
  methods: {
    async login(e) {
      const password = e.target[0].value.trim();

      if (password === "") return

      const response = await RequestsServices.login(password)
      if (response.status === 200) {
        this.$store.commit("login", {token: response.data})
      } else {
        this.$refs.form.style.rowGap = "1rem";
        this.$refs['login_error'].style.display = "block"
      }
    },
    eye(int) {
      if (int === 1) {
        this.$refs["eye-on"].style.display = "none"
        this.$refs["eye-off"].style.display = "block"
        this.$refs.password.type = "text"
      } else {
        this.$refs["eye-on"].style.display = "block"
        this.$refs["eye-off"].style.display = "none"
        this.$refs.password.type = "password"
      }
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  align-items: center;
  justify-content: center;
}

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
  align-items: center;
}

input {
  font-size: 20px;
  outline: none;
  border: none;
  border-radius: 15px;
}
</style>