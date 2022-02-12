<template>
  <header>
    oooooooooooooooooooooooooooooo
    <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
      <option value="ta">Taille/Age</option>
      <option value="td">Taille/Date</option>
    </select>
  </header>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  props: ["modelValue"],
  emits: ["update:modelValue"],
}
</script>

<style scoped>

</style>