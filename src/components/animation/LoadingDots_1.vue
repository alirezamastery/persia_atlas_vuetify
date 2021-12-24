<template>
  <svg id="dots" width="60px" height="30px" viewBox="0 0 132 58" version="1.1" xmlns="http://www.w3.org/2000/svg"
       xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>dots</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="dots" fill="#A3A3A3">
        <circle id="dot1" cx="20" cy="30" r="10"></circle>
        <circle id="dot2" cx="70" cy="30" r="10"></circle>
        <circle id="dot3" cx="120" cy="30" r="10"></circle>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: "LoadingDots_1"
}
</script>

<style scoped>
svg {
  margin: auto;
}

#dots #dot1 {
  animation: load 1s infinite;

}

#dots #dot2 {
  animation: load 1s infinite;
  animation-delay: 0.2s;

}

#dots #dot3 {
  animation: load 1s infinite;
  animation-delay: 0.4s;

}

@keyframes load {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>