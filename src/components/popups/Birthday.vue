<template>
  <div class="popup">
    <div class="container">
      <div>
        <close-button @click="close"/>
        <h2>{{ $t("birthday.title") }}</h2>
      </div>
      <div class="content">
        <p v-if="this.next"
           v-html="$t('birthday.message', {name: next.name,date: next.date,age: next.age,days: next.days})"></p>
        <img id="cake" alt="cake" src="cake.png">
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
      const birthday = document.getElementById("birthday")
      birthday.style.display = "none"
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
      const today = new Date();

      let next = undefined;

      for (let name in children) {
        const child = children[name];
        const split = child.date.split("/")
        const birthday = new Date(today.getFullYear() + (today.getMonth() < split[1] - 1 ? 0 : 1), split[1] - 1, split[0])

        const date = this.dateToStr(birthday)
        const days = Math.floor((birthday - today) / 1000 / 60 / 60 / 24) + 1
        const age = birthday.getFullYear() - split[2]

        if (!next || next.days > days) {
          next = {name, date, days, age}
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
  width: 30%;
  max-height: 20rem;
}
</style>