<template>
  <!--  Close Icon by Unicons Font-->
  <svg id="closeSvgButton" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" @click="$emit('click')">
    <path
        d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/>
  </svg>
</template>

<script>
export default {
  name: "CloseButton",
  emits: ["click"]
}
</script>

<style scoped>
#closeSvgButton {
  width: 2rem;
  height: 2rem;
  fill: var(--red-salsa);
  cursor: pointer;
  position: absolute;
  right: 1rem;
  top: 1rem;
  padding: .2rem;
  transition: .2s fill, .2s background-color;
  border-radius: 50px;
}

#closeSvgButton:hover {
  fill: var(--white);
  background-color: var(--red-salsa);
}
</style>