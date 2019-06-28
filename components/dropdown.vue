<template lang="pug">
transition(name="dropdown" @enter="setHeight" @after-enter="unsetHeight" @before-leave="setHeight")
  slot
</template>

<script>
export default {
  name: 'DropdownTransition',

  methods: {
    setHeight(items) {
      items.style.height = items.scrollHeight + 'px'
    },

    unsetHeight(items) {
      items.style.height = ''
    },
  },
}
</script>

<style lang="stylus">
.dropdown-enter, .dropdown-leave-to
  height 0 !important
</style>
