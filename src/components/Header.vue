<template>
  <header>
    <div id="toolButtons">
      <div id="reducedIcon" class="iconBall">
        <!--  Menu Icon by Akveo on IconScout -->
        <svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect height="24" opacity="0" transform="rotate(180 12 12)" width="24"/>
          <rect height="2" rx=".95" ry=".95" width="18" x="3" y="11"/>
          <rect height="2" rx=".95" ry=".95" width="18" x="3" y="16"/>
          <rect height="2" rx=".95" ry=".95" width="18" x="3" y="6"/>
        </svg>
      </div>
      <div id="toolButtonsBackground">
        <div class="iconBall clickable" @click="showConfig">
          <!--  Wrench Icon by Rank Sol on Iconscout  -->
          <svg class="icon" viewBox="0 0 32 32">
            <path
                d="M31.67,4.76a.51.51,0,0,0-.35-.33.47.47,0,0,0-.45.13L27,8.44,24.81,7.2,23.56,5l3.88-3.87a.49.49,0,0,0,.13-.46.5.5,0,0,0-.33-.35A6.84,6.84,0,0,0,18.67,9L6.82,20.83a5.7,5.7,0,0,0-5.17,1.54,5.65,5.65,0,0,0,8,8,5.68,5.68,0,0,0,1.53-5.17L23,13.33a6.83,6.83,0,0,0,8.65-8.57ZM8.13,26.07,7.57,28a.44.44,0,0,1-.31.31l-1.89.56-.13,0a.43.43,0,0,1-.32-.14L3.28,27.09a.44.44,0,0,1-.11-.45l.55-1.9a.47.47,0,0,1,.31-.3l1.89-.57a.49.49,0,0,1,.46.12L8,25.62A.45.45,0,0,1,8.13,26.07Z"/>
          </svg>
        </div>
        <div class="iconBall clickable" @click="showHelp">
          <!--  Question Icon by Elegant Themes -->
          <svg class="icon" style="width: 90%; height: 90%;" viewBox="0 0 32 32">
            <path
                d="M13.774 26.028a2.06 2.06 1080 1 0 4.12 0 2.06 2.06 1080 1 0-4.12 0zm5.69-7.776c2.898-1.596 4.37-3.91 4.37-6.876 0-5.094-4.018-7.376-8-7.376-3.878 0-8 2.818-8 8.042a2 2 0 1 0 4 0c0-2.778 2.074-4.042 4-4.042 1.494 0 4 .438 4 3.376 0 1.042-.274 2.258-2.298 3.374-1.376.754-3.702 2.712-3.702 5.25a2 2 0 1 0 4 0c0-.372.79-1.286 1.63-1.748z"/>
          </svg>
        </div>
        <div class="iconBall clickable" @click="showBirthday">
          <svg class="icon" viewBox="0 0 448 512">
            <path
                d="M352 111.1c22.09 0 40-17.88 40-39.97S352 0 352 0s-40 49.91-40 72S329.9 111.1 352 111.1zM224 111.1c22.09 0 40-17.88 40-39.97S224 0 224 0S184 49.91 184 72S201.9 111.1 224 111.1zM383.1 223.1L384 160c0-8.836-7.164-16-16-16h-32C327.2 144 320 151.2 320 160v64h-64V160c0-8.836-7.164-16-16-16h-32C199.2 144 192 151.2 192 160v64H128V160c0-8.836-7.164-16-16-16h-32C71.16 144 64 151.2 64 160v63.97c-35.35 0-64 28.65-64 63.1v68.7c9.814 6.102 21.39 11.33 32 11.33c20.64 0 45.05-19.73 52.7-27.33c6.25-6.219 16.34-6.219 22.59 0C114.1 348.3 139.4 367.1 160 367.1s45.05-19.73 52.7-27.33c6.25-6.219 16.34-6.219 22.59 0C242.1 348.3 267.4 367.1 288 367.1s45.05-19.73 52.7-27.33c6.25-6.219 16.34-6.219 22.59 0C370.1 348.3 395.4 367.1 416 367.1c10.61 0 22.19-5.227 32-11.33V287.1C448 252.6 419.3 223.1 383.1 223.1zM352 373.3c-13.75 10.95-38.03 26.66-64 26.66s-50.25-15.7-64-26.66c-13.75 10.95-38.03 26.66-64 26.66s-50.25-15.7-64-26.66c-13.75 10.95-38.03 26.66-64 26.66c-11.27 0-22.09-3.121-32-7.377v87.38C0 497.7 14.33 512 32 512h384c17.67 0 32-14.33 32-32v-87.38c-9.91 4.256-20.73 7.377-32 7.377C390 399.1 365.8 384.3 352 373.3zM96 111.1c22.09 0 40-17.88 40-39.97S96 0 96 0S56 49.91 56 72S73.91 111.1 96 111.1z"></path>
          </svg>
        </div>
      </div>
    </div>
    <h1>{{ $t("header.title") }}</h1>
    <div id="flags">
      <country-flag
          v-for="lang in languages"
          :key="lang.title"
          :country="lang.flag"
          :rounded="true"
          class="flag clickable"
          size="big"
          @click="changeLocale(lang.lang)"/>
    </div>
  </header>
</template>

<script>
import CountryFlag from "vue-country-flag-next"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  components: {CountryFlag},
  data() {
    return {
      languages: [
        {flag: "us", lang: "en", title: "English"},
        {flag: "fr", lang: "fr", title: "Français"}
      ]
    }
  },
  methods: {
    changeLocale(locale) {
      localStorage.setItem('lang', locale)
      this.$root.$i18n.locale = locale;
    },
    showConfig() {
      const config = document.getElementById("config")
      config.style.display = "flex"
    },
    showHelp() {
      const help = document.getElementById("help")
      help.style.display = "flex"
    },
    showBirthday() {
      const birthday = document.getElementById("birthday")
      birthday.style.display = "flex"
    }
  }
}
</script>

<style scoped>
header {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 30px;
  padding: 0 1rem;

  place-items: center;
  align-items: center;
  background-color: var(--maximum-blue);
}

@media screen and (min-width: 1200px) {
  header {
    grid-template-columns: 1fr .5fr 1fr !important;
  }
}

#toolButtons {
  display: flex;
  flex-wrap: wrap;
}

#toolButtonsBackground {
  display: flex;
  flex-direction: row !important;
  justify-content: space-evenly;
  column-gap: 3rem;
  border-radius: 50px;
  height: auto;
}

#reducedIcon {
  display: none !important;
}

@media screen and (max-width: 800px) {
  #toolButtons {
    position: sticky;
    flex-direction: column !important;
    flex-wrap: wrap !important;
    border-radius: 50px;
  }

  #toolButtonsBackground {
    display: none;
    flex-direction: column !important;
    flex-wrap: wrap !important;
    column-gap: 0;
  }

  #toolButtons .iconBall {
    display: none;
  }

  #toolButtons #reducedIcon {
    display: flex !important;
    fill: var(--red-salsa);
    transition: .5s;
  }

  #toolButtons:hover #toolButtonsBackground, #toolButtonsBackground:hover {
    display: flex;
    position: absolute;
    padding-top: calc(var(--iconBallSize) + .5rem);
    row-gap: .5rem;
  }

  #toolButtons:hover #reducedIcon, #toolButtonsBackground:hover #reducedIcon {
    transform: rotateZ(90deg);
  }

  #toolButtonsBackground .iconBall {
    display: flex;
  }
}

.iconBall {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--iconBallSize) !important;
  height: var(--iconBallSize) !important;
  border-radius: 50%;
  background-color: var(--white);
  box-shadow: 0 0 15px -5px var(--rich-black);
  transition: .2s background-color;
}

.icon {
  width: 70%;
  height: 70%;
  fill: var(--red-salsa);
  transition: .2s fill;
}

.iconBall:hover {
  background-color: var(--red-salsa);
}

.iconBall:hover > .icon {
  fill: var(--white)
}

#flags {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
  max-width: 20rem;
}

@media screen and (max-width: 600px) {
  #flags {
    display: none;
  }
}

.flag {
  zoom: 150%;
  border: var(--maximum-blue) 2px solid;
  transition: .3s border linear;
}

.flag:hover {
  border: var(--fluorescent-blue) 2px solid;
}

.clickable:hover {
  cursor: pointer;
}
</style>