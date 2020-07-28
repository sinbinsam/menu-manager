<template>
<div>
    <div>
    <component 
    v-if="this.menuItems"
    v-bind:menuItems='menuItems'
    :is="comp"></component>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            restaurantId: '',
            menuItems: null
        }
    },
    layout: 'noSideBar',
    methods: {
    subscribe() {
      this.sockets.subscribe('action_events', (data) => {
      if (data.type == 'command' && data.target == 'menu' && data.action == 'refresh') {
          this.populateMenuItems()
      }
      });

    },
    populateMenuItems() {
      axios.get(process.env.baseUrl + '/api/menu/' + this.restaurantId)
        .then(res => this.menuItems = res.data)
    },
    },
    mounted() {
        this.subscribe()
    },
    created() {
        this.restaurantId = this.$route.params.restId
        this.populateMenuItems()
    },
computed: {
  comp () {
      return () => import(`@/components/menus/${this.restaurantId}.vue`)
  }
}
}
</script>

<style scoped>

</style>