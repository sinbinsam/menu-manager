<template>
  <div>
    <sideBar />
    <nuxt id = 'mainView' />
  </div>
</template>

<script>
import Vue from 'vue'
import sideBar from '../components/sideBar'

export default {
  components: {
    sideBar
  },
}
</script>

<style>
#mainView {
  margin-left: 320px;
}
</style>
