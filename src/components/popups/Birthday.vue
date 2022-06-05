<template>
  <div class="popup" ref="birthday">
    <div class="container">
      <div>
        <close-button @click="close"/>
        <h2>{{ $t("birthday.title") }}</h2>
      </div>
      <div class="content">
        <p v-if="this.next"
           v-html="this.next.days === 0 ? $t('birthday.messageToday', {name: next.name, age: next.age}) : $t('birthday.message', {name: next.name, date: next.date, age: next.age, days: next.days})"></p>
        <img id="cake" alt="cake" src="../../../public/cake.png">
      </div>
    </div>
  </div>
</template>

<script>
import CloseButton from "@/components/popups/CloseButton";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Birthday",
  components: {CloseButton},
  methods: {
    close() {
      this.$emit("close")
    },
    dateToStr: function (date) {
      const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();

      return day + " " + month + " " + year
    }
  },
  computed: {
    next() {
      const children = this.$store.getters.children;
      const today = new Date()
      today.setHours(0, 0, 0, 0);

      let next = undefined;

      for (let name in children) {
        const child = children[name];
        const split = child.date.split("/")
        const birthday = new Date(today.getFullYear(), split[1] - 1, split[0])

        if (birthday < today)
          birthday.setFullYear(birthday.getFullYear() + 1)

        const date = this.dateToStr(birthday)
        const days = Math.floor((birthday - today) / 1000 / 60 / 60 / 24)
        const age = birthday.getFullYear() - split[2]

        if (!next || next.days > days) {
          next = {name, date, days, age}
        }

        if (birthday.getTime() === today.getTime()) {
          break
        }
      }
      return next
    }
  }
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;

  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1.8;
}

#cake {
  height: 60%;
  max-height: 20rem;
  aspect-ratio: 1;
}

@media only screen and (min-width: 321px) and (max-width: 799px) {
  #cake {
    display: none;
  }
}

@media only screen and (min-width: 800px) and (max-width: 1200px) {
  #cake {
    max-height: 15rem;
  }
}
</style>