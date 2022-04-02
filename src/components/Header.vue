<template>
  <header>
    <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
      <option value="ta">Taille/Age</option>
      <option value="td">Taille/Date</option>
    </select>
    <button @click="this.toggleSideBar()">Config</button>
  </header>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  props: ["modelValue"],
  emits: ["update:modelValue"],
  methods: {
    toggleSideBar: function () {
      const style = document.getElementById("side").style;
      if (style.display === "none")
        style.display = "block";
      else
        style.display = "none";
    }
  }
}
</script>

<style scoped>

</style>