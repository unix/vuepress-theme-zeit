<template>
  <svg class="icon" :class="{ expand: isExpand }" width="9" height="12" viewBox="0 0 22 12" fill="none">
    <path d="M1 1L11 11L21 1" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  </svg>
</template>

<script>
export default {
  props: ['is-expand'],
}
</script>

<style lang="stylus" scoped>
.icon
  margin-right 12px
  ransition all 0.15s ease

  &.expand
    transform rotate(-90deg)
</style>
